import { usersModel } from "../models/user.model.js"

export const adminLogin = async(req,res) => {
    try{
        const dbUser = await usersModel.findByID(req.user.id);
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

export const getUsers = async(req,res) => {
    try{
        const users = await usersModel.find();
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