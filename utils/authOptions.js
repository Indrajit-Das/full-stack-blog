import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import Users from "@/models/users";
import bcrypt from 'bcrypt';

export const authOprions={
    session:{
        strategy: "jwt"
    },
    providers:[
        CredentialsProvider({
            async authorize(credentials,req){
                dbConnect();
                const {email,password} = credentials;
                // getting the user if it exist or not
                const user = Users.findOne({email});
                // to check valid user or not
                if(!user){
                    throw new Error("Invalid user email");
                }
                if(!user.password){
                    throw new Error("Please login via the method you used to signup");
                }
                // matching the password
                const isPasswordMatched = await bcrypt.compare(password,user.password);
                if(!isPasswordMatched){
                    throw new Error("Invalid user email or password");
                }
                return user;

            }
        })
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    pages:{
        signIn: "/login",
        signUp: "/register"
    }
}