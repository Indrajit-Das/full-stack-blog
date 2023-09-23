import mongoose from "mongoose";

const dbConnect = async()=>{
    if(mongoose.connections.readyState >=1 ){
        return;
    }
    console.log(process.env.DB_URI);
    mongoose.connect(process.env.DB_URI);
    console.log("Connected to the database");
}
export default dbConnect;