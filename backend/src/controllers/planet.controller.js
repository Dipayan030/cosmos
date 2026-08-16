import { planetModel } from "../models/planet.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const getPlanets = async(req,res) => {
    try{
        const planets = await planetModel.findAll();
        if(!planets) {
            return res.status(404).json({ error: "Error getting planets data from db"});
        };
        return res.status(200).json({
            data: planets
        });
    } catch(err){
        console.error("Error getting planets data from db", err);
    }
};

export const addPlanets = async(req,res) => {
    try{
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        };
        const result = await uploadToCloudinary(req.file.path, 'user_profiles');
        if (!result) {
            return res.status(500).json({ success: false, message: 'Failed uploading asset to cloud storage.' });
        }
        await planetModel.add(req.body);
        return res.status(201).json({
            message: "Planet added successfully",
            data: req.body
        });
    } catch(err){
        console.error("Error adding planet in to db", err);
    }
};