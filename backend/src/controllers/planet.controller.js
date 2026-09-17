import { planetModel } from "../models/planet.model.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import { v7 as uuidv7 } from 'uuid';
import { Parser } from 'json2csv';

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

export const toggleStatusPlanet = async(req,res) => {
    try {
        if (!req.params.id){
            return res.status(400).json({ success: false, message: "PlanetId not found"});
        };
        const status = req.body?.status;
        const id = req.params.id;
        if (!status) {
            return res.status(400).json({ success: false, message: "Planet status not found" });
        }
        await planetModel.toggleStatus(status,id);
        return res.status(201).json({
            message: "Planet Status toggled successfully",
            data: {
                status,
                id: req.params.id
            }
        })
    } catch (err) {
        console.error('Error toggling status of planet', err);
    }
}

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
        console.log(result.public_id,result.secure_url)
        await planetModel.add({
            planet_id: planetId,
            name: req.body.name,
            description: req.body.description,
            about: req.body.about,
            img: result.secure_url,
            cloudinaryID: result.public_id,
            equatorial_radius : req.body.equatorial_radius ,
            orbital_period : req.body.orbital_period ,
            mass_density : req.body.mass_density ,
            solar_aphelion : req.body.solar_aphelion 
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
            planet_id: req.params.id,
            equatorial_radius : req.body.equatorial_radius ,
            orbital_period : req.body.orbital_period ,
            mass_density : req.body.mass_density ,
            solar_aphelion : req.body.solar_aphelion 
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
        const response = await deleteFromCloudinary(planet[0].cloudinaryID);
        if (response == null){
            console.log("Cloudinary deletion failed");
            return null;
        }
        await planetModel.delete(planetId);
    } catch(err) {
        console.error("Error deleting plaenet form db", err)
    }
};

export const csvExportPlanets = async(req,res) => {
    try {
        const data = await planetModel.findAll();
        if(!data) {
            console.log("Failed getting data from db");
            return null;
        }
        const fields = ['BIN_TO_UUID(p.planet_id)', 'name', 'description', 'about', 'img', 'status','created_at','equatorial_radius','orbital_period','mass_density','solar_aphelion']
        const json2csvParser = new Parser({ fields });
        const csvData = json2csvParser.parse(data);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=planet_data.csv');
        return res.status(200).send(csvData);
    } catch (err) {
        console.error("Error exporting bookings data", err);
    }
};