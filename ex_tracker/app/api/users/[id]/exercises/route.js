import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import { Exercise, User, Log } from "@/app/api/Schemas";


export async function POST(request) {
    try {
        const data = await request.json();
        const url = await request.url;
        const urlSegments = url.split('/');
        let userId = urlSegments[5];
        let userDate;

        let mongo_uri = process.env.MONGO_URI;
        
        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri, {
                dbName: 'Exercise-Tracker'
            })
        }

        if(data.date == "" || data.date == undefined){
            userDate = new Date().toDateString();
        } else {
            userDate = new Date(data.date).toDateString();
        }

        let user = await Log.findById(userId);

        if (user == null) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        //console.log(user);

        await Log.updateOne(
            {_id : userId},
            {
                $push: {
                    log: {
                        description: data.description,
                        duration: Number(data.duration),
                        date: userDate
                    }
                },
                $inc : {count : 1}

            }
        );

        //let updatedUser = await Log.findById(userId);

        let exerciseLog = {
            username: user.username,
            description: data.description,
            duration: data.duration,
            date: userDate,
            _id: user._id,
        }

        await mongoose.disconnect();
        return NextResponse.json({exerciseLog}, {status: 200});
    } catch (error) {
        
        console.error(error);

        if(error.name === "CastError"){
            return NextResponse.json({ msg: "Invalid User ID format" }, { status: 400 });
        }
       
        return NextResponse.json({msg: `Server Error : \n${error}`},{status : 500});
    }
}