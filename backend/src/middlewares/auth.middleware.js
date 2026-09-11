import { createClient } from "@supabase/supabase-js"
import { usersModel } from "../models/user.model.js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export const verifyToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')){
            return { errorStatus: 401, message: "No token provided" };
        };
        const token = authHeader.split(' ')[1];
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            return { errorStatus: 401, message: "Invalid or expired token"};
        };
        return { supabaseUser: user };

    } catch (err){
        console.error("Error fetching token:", err);
        return res.status(500).json({ error: 'Internal server error during authentication.' });
    }
}; 

export const userAuth = async (req, res, next) => {
    try{
        const { supabaseUser, errorStatus, message } = await verifyToken(req, res);
        if (errorStatus) return res.status(errorStatus).json({ message });
        req.user = supabaseUser;
        next();
    } catch(err){
        console.err("Auth error:", err);
    }
};

export const adminAuth = async (req, res, next) => {
    try {
        const { supabaseUser, errorStatus, message } = await verifyToken(req, res);
        if (errorStatus) return res.status(errorStatus).json({ message });
        const dbUser = await usersModel.findByID(supabaseUser.id);
        // console.log("db user1:", dbUser);
        // if(!dbUser || dbUser[0]) return res.status(404).json({ message: "User not found" });
        // console.log("db user2:", dbUser)
        // if (dbUser[0].role !== 'admin'){
        //     return res.status(403).json({ message: "Access denied" });
        // };
        // console.log("db user3:", dbUser)
        req.user = dbUser;
        next();
    } catch(err) {
        console.error("Auth error:", err) 
    }
};