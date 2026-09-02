import { usersModel } from "../models/user.model.js"

export const adminLogin = async(req,res) => {
    try{
        const dbUser = req.user;
        if(!dbUser[0] || !dbUser){
            return res.status(404).json({ error: 'User record not found in database' });
        };
        return res.status(200).json({
            role: dbUser[0].role
        });

    } catch(err) {
        console.error("Error syncing admin with backend:", err);
    }
    
};