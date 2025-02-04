import { NextResponse, NextRequest } from "next/server";
import { headers } from 'next/headers';
import mongoose from "mongoose";
import { Exercise, User, Log } from "@/app/api/Schemas";


export async function POST(request) {
    try {

        let mongo_uri = process.env.MONGO_URI;
        
        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri, {
                dbName: 'Exercise-Tracker'
            })
        }

        // Get Headers
        const headersList = await headers();
        const userAgent = headersList.get('content-type').split(";");
        const contentType = userAgent[0];

        
        const url = await request.url;
        const urlSegments = url.split('/');
        let userId = urlSegments[5];
        let data;
        let userDate;
        let desc;
        let duration;

        if(contentType == "multipart/form-data"){

            data = await request.formData();
            
            if(data.get("date") == "" || data.get("date") == undefined){
                userDate = new Date().toDateString();
            } else {
                userDate = new Date(data.get("date")).toDateString();
            }

            desc = data.get("description");
            duration = Number(data.get("duration"));
        } else {

            data = await request.json();

            if(data.date == "" || data.date == undefined){
                userDate = new Date().toDateString();
            } else {
                userDate = new Date(data.date).toDateString();
            }

            desc = data.description;
            duration = Number(data.duration);
        }

        
        let user = await Log.findById(userId);

        if (user == null) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        await Log.updateOne(
            {_id : userId},
            {
                $push: {
                    log: {
                        description: desc,
                        duration: duration,
                        date: userDate
                    }
                },
                $inc : {count : 1}

            }
        );

        //let updatedUser = await Log.findById(userId);

        let exerciseLog = {
            username: user.username,
            description: desc,
            duration: duration,
            date: userDate,
            _id: user._id,
        }

        await mongoose.disconnect();
        return NextResponse.json(exerciseLog, {status: 200});
    } catch (error) {
        
        console.error(error);

        if(error.name === "CastError"){
            return NextResponse.json({ msg: "Invalid User ID format" }, { status: 400 });
        }
       
        return NextResponse.json({msg: `Server Error : \n${error}`},{status : 500});
    }
}