import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://foodapp:Sooraj1993@cluster0.gznf3ts.mongodb.net/food-delivery-app').then(()=>console.log("DB Connected"));
}