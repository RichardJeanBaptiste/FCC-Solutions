import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
//import { Exercise } from "@/app/api/Schemas";

/**
 * 
 * const ExerciseSchema = new mongoose.Schema({
     username: {
         type: String
     },
     description: {
         type: String
     },
     duration: {
         type: Number
     },
     date: {
         type: String
     },
     _id: {
         type: String
     }
 }); 
 * 
 */

const ExerciseSchema = new mongoose.Schema({
    id: {
        type: String
    },
    description: {
        type: String
    },
    duration: {
        type: Number
    },
    date: {
        type: String
    },
});

const Exercise = mongoose.models.Exercise || mongoose.model("Exercises", ExerciseSchema, "exercises");

export async function POST(request) {
    try {
        const data = await request.json();
        const url = await request.url;
        const urlSegments = url.split('/');
        let userId = urlSegments[5];

        let mongo_uri = process.env.MONGO_URI;
        
        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri, {
                dbName: 'Exercise-Tracker'
            })
        }

        const newExercise = new Exercise({
            id: userId,
            description: data.description,
            duration: data.duration,
            date: data.date,
        })

        await newExercise.save();

        return NextResponse.json({msg: "Exercise Added"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg: `Server Error : \n${error}`},{status : 500});
    }
}