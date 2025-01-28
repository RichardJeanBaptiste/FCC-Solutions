const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    _id: {
        type: String,
    }
});


const ExerciseSchema = new mongoose.Schema({
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


const LogSchema = new mongoose.Schema({
    username: {
        type: String
    },
    count: {
        type: Number
    },
    _id: {
        type: String
    },
    log: {
        type: [{
            description: {
                type: String,
            },
            duration: {
                type: Number,
            },
            date: {
                type: String,
            },
        }]
    }
});

const User = mongoose.models.User || mongoose.model("Users", UserSchema, "users");
const Exercise = ExerciseSchema || mongoose.model("Exercises", ExerciseSchema, "exercises");
const Log = LogSchema || mongoose.model("Logs", LogSchema, "logs");

module.exports = { User, Exercise, Log };
//module.exports = User;