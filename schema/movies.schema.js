import mongoose from "mongoose";
const {Schema} = mongoose;

 const movieSchema =  new Schema({
    title : String,
    desc : String,
    duration : Number,
    actorsName : String,
    thumbnail : String,
    video : String,
    category : String,
    tags : String,
    job_id : String,
    active : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

 mongoose.models = {};
// jab overwrite ka error aye to ye use kerna hey
//OverwriteModelError: cannot overwrite 'movie' model once compiled

export default mongoose.model("movie",movieSchema)