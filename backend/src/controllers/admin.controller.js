import { usersModel } from "../models/user.model.js"
import { planetModel } from "../models/planet.model.js";
import { bookingModel } from "../models/booking.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

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