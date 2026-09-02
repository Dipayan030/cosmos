import { planetModel } from "../models/planet.model.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import { v7 as uuidv7 } from 'uuid';

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
        const result = await uploadToCloudinary(req.file.path, 'planet_images');
        if (!result) {
            return res.status(500).json({ success: false, message: 'Failed uploading asset to cloud storage.' });
        };
        const planetId = uuidv7();
        await planetModel.add({
            planet_id: planetId,
            name: req.body.name,
            description: req.body.description,
            about: req.body.about,
            img: result.secure_url,
            cloudinaryID: result.public_id
        });
        return res.status(201).json({
            message: "Planet added successfully",
            data: req.body
        });
    } catch(err){
        console.error("Error adding planet in to db", err);
    }
};

export const editPlanets = async(req,res) => {
    try {
        if (!req.file) {
            return res.status(400).json
        };
        const planet = await planetModel.findById(req.params.id);
        if (!planet || !planet[0]) return res.status(404).json({ message: 'Planet not found' });
        if (planet[0].cloudinaryID){
            await deleteFromCloudinary(planet[0].cloudinaryID)
        };
        const result = await uploadToCloudinary(req.file.path, 'planet_images');
        if (!result) {
            return res.status(500).json({ success: false, message: 'Failed uploading asset to cloud storage.' });
        };
        await planetModel.edit({
            name: req.body.name,
            description: req.body.description,
            about: req.body.about,
            img: result.secure_url,
            cloudinaryID: result.public_id,
            planet_id: req.params.id
        });
    } catch(err) {
        console.error("Error occured editng planet data:",err);
    }
};

export const deletePlanets = async(req,res) => {
    try {
        const planetId = req.params.id;
        const planet = await planetModel.findById(planetId);
        if (!planet || !planet[0]) return res.status(404).json({ message: 'Planet not found' });
        await deleteFromCloudinary(planet[0].cloudinaryID);
        await planetModel.delete(planetId);
    } catch(err) {
        console.error("Error deleting plaenet form db", err)
    }
};