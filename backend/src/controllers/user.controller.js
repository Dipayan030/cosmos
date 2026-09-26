import { usersModel } from "../models/user.model.js"
import { sendEmail } from "../utils/brevo.js";
import { json } from "express";
import { generateId } from "../utils/idGenerator.js";
import { Parser } from "json2csv";
import { render } from "@react-email/components";
import WelcomeEmail from "../../emails/WelcomeEmail.jsx";

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
            role: 'user',
            space_id: generateId('SP')
        });
        const userFirstname = user?.user_metadata.full_name.slice(0 , user?.user_metadata.full_name.indexOf(' '));
        const htmlContent = await render(WelcomeEmail({ userFirstname: userFirstname}));
        await sendEmail(
            htmlContent,
            "Welcome to COSMOS",
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

export const csvExportUsers = async(req,res) => {
    try {
        const data = await usersModel.findAll();
        if(!data) {
            console.log("Failed getting data from db");
            return null;
        }
        const fields = ['space_id','email','name','created_at','last_sign_in_at']
        const json2csvParser = new Parser({ fields });
        const csvData = json2csvParser.parse(data);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=users_data.csv');
        return res.status(200).send(csvData);
    } catch (err) {
        console.error("Error exporting bookings data", err);
    }
}