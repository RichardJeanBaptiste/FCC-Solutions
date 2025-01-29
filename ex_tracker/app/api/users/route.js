import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
//import { User }  from "../Schemas";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    id: {
        type: String,
    }
});

const User = mongoose.models.User || mongoose.model("Users", UserSchema, "users");

export async function POST(request){
    
    try {
        let mongo_uri = process.env.MONGO_URI;

        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri, {
                dbName: 'Exercise-Tracker'
            })
        }

        let data = await request.json();

        // check if username exists
        const newUser = new User({
            username: data.username,
            id: new mongoose.Types.ObjectId().toString(),
        });

        await newUser.save();

        return NextResponse.json({ msg: "User Added"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg: "Server Error :("},{status: 500});
    }
}