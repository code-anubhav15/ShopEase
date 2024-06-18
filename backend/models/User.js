import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            min: 3,
            max: 50,
        },
        email:{
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password:{
            type: String,
            required: true,
            min: 5,
        },
        cartData:{
            type: Object,
        },
        date:{
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;