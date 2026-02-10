import mongoose  from "mongoose"

const userSchema = new mongoose.Schema(
    {

    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : String,
    phone : {
        type : String,
        default : "NOT GIVEN"
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        default : "user" // customer
    },
    isEmailVerified : {
        type : String,
        default : "false"

    },
    image : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }

    }
)

const User = mongoose.model("users", userSchema)
export default User