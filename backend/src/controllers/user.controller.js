import { usersModel } from "../models/user.model.js"
import { createClient } from "@supabase/supabase-js"
import { BrevoClient } from '@getbrevo/brevo';
import { json } from "express";


const brevoClient = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export const signUp = async (req,res) => {
    try{
        console.log(req.body);
        const authHeader = req.headers.authorization;
        if (!authHeader){
            return res.status(401).json({ error: "Missing Token" });
        };
        const token = authHeader.split(' ')[1];
        const { data: {user}, error } = await supabase.auth.getUser(token);
        if (!user || error) {
            return res.status(401).json({ error: "Invalid user token"});
        };
        const records = await usersModel.findByID(user.id);
        if (records) {
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
            last_sign_in_at: user.last_sign_in_at?user.last_sign_in_at.slice(0, 19).replace('T', ' ') : null
        });
        await brevoClient.transactionalEmails.sendTransacEmail({
            htmlContent: `
                <h1>Welcome! ${user.user_metadata?.name}</h1>
            `,
            sender: {
                email: process.env.EMAIL_USER,
                name: "COSMOS COMMAND",
            },
            subject: "Hello from COSMOS",
            to: [
                {
                    email: user.email,
                    name: user.user_metadata?.name || user.user_metadata.full_name,
                },
            ],
        });

    } catch (err) {
        console.error("Error syncing users to backend", err);
    }
};