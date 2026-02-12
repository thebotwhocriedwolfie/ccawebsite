import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MemberSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model("Member", MemberSchema); 
