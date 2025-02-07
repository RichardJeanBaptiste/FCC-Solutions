const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {User, Log} = require('./Schemas');
const req = require('express/lib/request');
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


let mongo_uri = process.env.MONGO_URI;
const connectToMongo = async () => {
  if(mongo_uri != undefined){
    await mongoose.connect(mongo_uri, {
        dbName: 'Exercise-Tracker',
    }).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
  }
}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users', async (req, res) => {

    try {
      connectToMongo();
      const users = await User.find({});
      res.json(users);  
    } catch (error) {
      console.log(error);
      res.send("error occured!");
    }
});

app.post('/api/users', async (req, res) => {
  try {
    connectToMongo();
    let username = req.body.username;
    let newId = new mongoose.Types.ObjectId().toString();
    
    let checkUsername = await User.find({username: username});

    if(checkUsername.length > 0) {
      res.send("Username exists");  
    } else {

      const newUser = new User({
        username: username,
        _id: newId,
      });

      const newUserLog = new Log({
        _id: newId,
        username: username,
        count: 0,
        log: [],
      });

      let result = {
        username: username,
        _id: newId,
      }


      await newUser.save();
      await newUserLog.save();
      res.send(result);
    }
  } catch (error) {
    console.log(error);
    res.send("error occured while adding username");
  }
});

app.get('/api/users/:_id/logs', async (req,res) => {
   // 67a143786ad5fa241f23d464
  try {
    connectToMongo();
    let userId = req.params._id;
    const {from, to, limit} = req.query;
    let log = await Log.findById(userId);
    let logCopy = log.log;
    let displayLog;
    let limitedCopy;

    // Check for queries
    if(from == undefined && to == undefined && limit == undefined){
      //console.log(log);
      res.send(log);
    } else {

      if(from == undefined && to == undefined){

        // http://localhost:3000/api/users/67a143786ad5fa241f23d464/logs?limit=2
        console.log("Only limit query added");
        limitedCopy = logCopy.slice(0, Number(limit));
        displayLog = {
          _id: userId,
          username: log.username,
          count: Number(limit),
          log : limitedCopy
        }

        res.send(displayLog);
      } else if(from != undefined) {

        // to is defined
        if(to != undefined){
          let fb1 = new Date(from);
          let fb2 = new Date(to);

          let filteredLogs = logCopy.filter((x) => {
            let compareDate = new Date(x.date);

            if(compareDate >= fb1 && compareDate <= fb2){
                return new Date(x.date).toDateString();
            }
          });

          limitedCopy = filteredLogs;

          // if to and limit are defined
          if(limit != undefined){
            limitedCopy = limitedCopy.slice(0, Number(limit));
            displayLog = {
              _id: userId,
              username: log.username,
              from: fb1.toDateString(),
              to: fb2.toDateString(),
              count: Number(limit),
              log : limitedCopy
            }
          } else {
            displayLog = {
              _id: userId,
              username: log.username,
              from: fb1.toDateString(),
              to: fb2.toDateString(),
              count: limitedCopy.length,
              log : limitedCopy
            }
          }
        
          res.send(displayLog);
        } else {
          // only from is defined
          let filterDate = new Date(from);
          let filteredLogs = logCopy.filter((x) => {
            let compareDate = new Date(x.date);
            if(compareDate >= filterDate){
                return new Date(x.date).toDateString();
            }
          });

          limitedCopy = filteredLogs;

          if(limit != undefined){
            limitedCopy = limitedCopy.slice(0, Number(limit));
            displayLog = {
              _id: userId,
              username: log.username,
              from: filterDate.toDateString(),
              count: Number(limit),
              log : limitedCopy
            }
          } else {
            displayLog = {
              _id: userId,
              username: log.username,
              from: filterDate.toDateString(),
              count: limitedCopy.length,
              log : limitedCopy
            }
          }

          res.send(displayLog);
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});


app.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    connectToMongo();
    let userId = req.params._id;
    let desc = req.body.description;
    let duration = Number(req.body.duration);
    let userDate = req.body.date == '' ? new Date().toDateString() : new Date(req.body.date).toDateString();
    let user = await Log.findById(userId);

    if (user == null) {
        res.send("User Not Found");
    } else {

      if(userDate == 'Invalid Date') {
        userDate =  new Date().toDateString();
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

      let exerciseLog = {
        username: user.username,
        description: desc,
        duration: duration,
        date: userDate,
        _id: userId,
      }

      res.send(exerciseLog);
    }
   
    
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});