import mongoose from "mongoose";
const {Schema} = mongoose;

 const purchaseSchema =  new Schema({
   email : {
    type : String,
    required : [true,'Email is required !']
   },
   planId : {
    type : String,
    required : [true,'PlanId is required !']
   },
   emi : {
    type : String,
    required : [true,'Emi is required !']
   },
   paymentId : {
    type : String,
    required : [true,'PaymentId is required !']
   },
   orderId : {
    type : String,
    required : [true,'OrderId is required !']
   },
   signature : {
    type : String,
    required : [true,'Signature is required !']
   },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

 mongoose.models = {};
 purchaseSchema.pre('save', async function(next){
    const plan =  await mongoose.model("purchase").findOne({email : this.email});
    if(plan){
        await mongoose.model("purchase").deleteOne({email : this.email});
    }
    next();
 })

export default mongoose.model("purchase",purchaseSchema)