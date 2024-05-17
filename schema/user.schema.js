import bcrypt from "bcrypt"
import mongoose from "mongoose";
const {Schema} = mongoose

const userSchema = new Schema({
    name : {
        type : String,
        required : [true,"Name is Required !"]
    },
    email : {
        type : String,
        required : [true,"Email is Required !"]
    },
    password : {
        type : String,
        required : [true,"Password is Required !"]
    },
    role : {
        type : String,
        required : [true,"Role is Required !"]
    },
    image : String,
    createdAt :{
        type : Date,
        default : Date.now

    }
  
})

userSchema.pre("save", async function(next){
const isUser = await mongoose.model("user").findOne({email : this.email})
if(isUser) return next(new Error("User Already Exists !"))
next();

})

// mongoss middleware

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password.toString(),12);
    next();
})

mongoose.models = {};

export default mongoose.model("user",userSchema)