import { NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import Users from "@/models/users";
import bcrypt from "bcrypt";

export async function POST(req,res){
    // temporary variable
    const _req = await req.json();
    // connect to the databse
    await dbConnect();
    // to save the data inside the database
    try{
        const { name,email,password} = _req;
        // check the user it is already existed or not
        const existingUser = await Users.findOne({email});
        if(existingUser){
            return NextResponse.json({status:false,err:"Email already exists"},{status:409})
        }else{
            const user = await new Users({
                // 10 is the strength of the character
                name,email,password:await bcrypt.hash(password,10)
            }).save();
            return NextResponse.json({status: true,msg:"new user added",data:user},{status:201});
        } 

    }catch(error){
        console.log(error);
        return NextResponse.json({status:false,msg:"fail to connect with database "+error},{status:500});
    }
}