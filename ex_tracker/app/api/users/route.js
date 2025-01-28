import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import { User }  from "../Schemas";



export async function POST(request){

    // const UserModel = mongoose.model('User', UserSchema);
    
    try {
        let mongo_uri = process.env.MONGO_URI;

        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri, {
                dbName: 'Exercise-Tracker'
            })
        }
        

        const newUser = new User({
            username: `Test User - ${Math.floor(Math.random() * 300)}`,
            _id: new mongoose.Types.ObjectId().toString(),
        });


        await newUser.save();
        

        return NextResponse.json({ msg: "User Added"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg: "Server Error :("},{status: 500});
    }
}