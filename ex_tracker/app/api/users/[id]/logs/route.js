import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import mongoose from "mongoose";
import { Log } from "@/app/api/Schemas";


export async function GET(request) {
    try {
        let mongo_uri = process.env.MONGO_URI;
        
        if(mongo_uri != undefined){
            await mongoose.connect(mongo_uri, {
                dbName: 'Exercise-Tracker'
            })
        }

        // Get Headers
        // const headersList = await headers();
        // const userAgent = headersList.get('content-type').split(";");
        // const contentType = userAgent[0];


        const reqUrl = request.url;
        const reqUrlSegments = reqUrl.split('/');
        const userId = reqUrlSegments[5];
        const urlObj =  new URL(reqUrl, "https://extracker.vercel.app/");
        let hasQuery = urlObj.searchParams.toString().length > 0;
        let queryEntries = Object.fromEntries(urlObj.searchParams.entries());
        let from = null;
        let to = null;
        let limit = null;

        let log = await Log.findById(userId);
        let logCopy = log.log;
        let displayLog = [];

        if(hasQuery){

            from = queryEntries.from;

            if(queryEntries.hasOwnProperty('to')){
                to = queryEntries.to;

                let fb1 = new Date(from);
                let fb2 = new Date(to);

                let filteredLogs = logCopy.filter((x) => {
                    let compareDate = new Date(x.date);

                    if(compareDate >= fb1 && compareDate <= fb2){
                        return x.date
                    }
                });

                if(queryEntries.hasOwnProperty('limit')){

                    limit = queryEntries.limit;
                    let limitedCopy = filteredLogs.slice(0, limit);

                    displayLog = {
                        _id: userId,
                        username: log.username,
                        from: from,
                        to: to,
                        count: limit,
                        log : limitedCopy
                    }
                } else {
                    displayLog = {
                        _id: userId,
                        username: log.username,
                        from: from,
                        to: to,
                        count: filteredLogs.length,
                        log : filteredLogs
                    }
                }

                // Filter with to else filter with only from
            } else {
                let filterDate = new Date(from);
                let filteredLogs = logCopy.filter((x) => {
                    let compareDate = new Date(x.date);
                    if(compareDate >= filterDate){
                        return x.date;
                    }
                });

                // Check If Limit exists 
                if(queryEntries.hasOwnProperty('limit')){
                    limit = queryEntries.limit;
                    let limitedCopy = filteredLogs.slice(0, limit);
                    
                    displayLog = {
                        _id: userId,
                        username: log.username,
                        from: filterDate,
                        count: limit,
                        log : limitedCopy
                    }
                } else {
                    displayLog = {
                        _id: userId,
                        username: log.username,
                        from: filterDate,
                        count: filteredLogs.length,
                        log : filteredLogs
                    }
                }
            }                       

            return NextResponse.json(displayLog, {status: 200});
        }    

        return NextResponse.json(log, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({"msg": "Something went wrong while getting your logs :("}, {status : 500});
    }
}