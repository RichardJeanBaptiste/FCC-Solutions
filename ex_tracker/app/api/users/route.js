import { NextResponse, NextRequest } from "next/server";
import { headers } from 'next/headers';
import mongoose from "mongoose";
import { User, Log }  from "../Schemas";


export async function POST(request){
    
    try {
        let mongo_uri = process.env.MONGO_URI;

        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri, {
                dbName: 'Exercise-Tracker'
            })
        }

        let data;
        let currentUsername;

        // Get Headers
        const headersList = await headers();
        const userAgent = headersList.get('content-type').split(";");
        const contentType = userAgent[0];

        if(contentType == "multipart/form-data"){
            data = await request.formData();
            currentUsername = data.get("username");
        } else {
            data = await request.json();
            currentUsername = data.username;
        }
        
        let newId = new mongoose.Types.ObjectId().toString();

        let checkUsername = await User.find({username: currentUsername});

        if(checkUsername.length > 0) {
            return NextResponse.json({msg: "Username Exists"}, {status: 404});
        }

        const newUser = new User({
            username: currentUsername,
            _id: newId,
        });

        const newUserLog = new Log({
            _id: newId,
            username: currentUsername,
            count: 0,
            log: [],
        })

        await newUser.save();
        await newUserLog.save();
        await mongoose.disconnect();
        
        return NextResponse.json({newUser}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({msg: "Server Error :("},{status: 500});
    }
}

export async function GET(){
    try {
        let mongo_uri = process.env.MONGO_URI;

        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri, {
                dbName: 'Exercise-Tracker'
            })
        }

        const users = await User.find({});

        return NextResponse.json(users, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}