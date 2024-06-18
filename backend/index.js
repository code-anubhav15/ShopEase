import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import User from "./models/User.js";

dotenv.config(); 

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URL);

// API Endpoint to check server status
app.get("/", (req, res) => {
    res.send("Express App Running!");
});

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let check = await User.findOne({ email: email });
        if (check) {
            return res.status(400).json({ success: false, error: "User already exists." ,});
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new User({
            name: username,
            email: email,
            password: passwordHash,
            cartData: cart,
        });

        await user.save();

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({ success: true, token, });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message, });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const passCompare = await bcrypt.compare(password, user.password);
            if (passCompare) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                res.json({ success: true, token,});
            } else {
                res.json({ success: false, error: "Incorrect Credentials.", });
            }
        } else {
            res.json({ success: false, error: "Incorrect E-mail." ,});
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message ,});
    }
});


const fetchUser = async (req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please Login In."})
    }
    else{
        try{
            const data = jwt.verify(token,process.env.JWT_SECRET);
            req.user = data;
            next();
        }
        catch(err){
            res.status(401).send({error:"Please Login In."})
        }
    }
}

app.post("/addtocart", fetchUser, async (req,res) => {
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added to Cart!");
})

app.post("/removefromcart", fetchUser, async (req,res) => {
    let userData = await User.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed From Cart!");
})

app.post("/getcart", fetchUser, async (req,res) => {
    let userData = await User.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

// Server Start
app.listen(PORT, (err) => {
    if (!err) {
        console.log("Server Running on port " + PORT);
    } else {
        console.log("Error: " + err);
    }
});
