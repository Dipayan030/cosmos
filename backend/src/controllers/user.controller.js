import { usersModel } from "../models/user.model.js"
import { sendEmail } from "../utils/brevo.js";
import { json } from "express";

export const signUp = async (req,res) => {
    try{
        const user = req.user;
        if (!user){
            return res.status(401).json({ error: "user authentication failed" });
        };
        const records = await usersModel.findByID(user.id);
        if (records[0]) {
            return res.status(200).json({
                isNewUser : false,
                user : records
            });
        };
        await usersModel.add({
            supabase_id: user.id,
            name: user.user_metadata?.name || user.user_metadata?.full_name,
            email: user.email,
            created_at: user.created_at?user.confirmed_at.slice(0, 19).replace('T', ' ') : null,
            last_sign_in_at: user.last_sign_in_at?user.last_sign_in_at.slice(0, 19).replace('T', ' ') : null,
            role: 'user'
        });
        await sendEmail(
            `<h1>Welcome! ${user.user_metadata?.name}</h1>`,
            "Hello from COSMOS",
            {
                email: user.email,
                name: user.user_metadata?.name || user.user_metadata.full_name,
            }
        );

    } catch (err) {
        console.error("Error syncing users to backend", err);
    }
};

export const getUsers = async(req,res) => {
    try{
        const users = await usersModel.findAll();
        if(!users) {
            return res.status(404).json({ error: "Error getting user data from db"});
        };
        return res.status(200).json({
            data: users
        });
    }catch(err){
        console.error("Error getting user data from db", err);
    }
};