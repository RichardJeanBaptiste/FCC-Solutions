const { default: mongoose } = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    id: {
        type: String,
    }
});


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


const LogSchema = new mongoose.Schema({
    username: {
        type: String
    },
    count: {
        type: Number
    },
    id: {
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
const Exercise = mongoose.models.Exercise || mongoose.model("Exercises", ExerciseSchema, "exercises");
const Log = LogSchema || mongoose.model("Logs", LogSchema, "logs");

module.exports = { User, Exercise, Log };
//module.exports = User;