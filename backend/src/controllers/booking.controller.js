import { bookingModel } from "../models/booking.model.js";
import { generateId } from "../utils/idGenerator.js";
import { Parser } from "json2csv";

export const getBookings = async(req,res) => {
    try{
        const bookings = await bookingModel.findAll();
        if(!bookings) {
            return res.status(404).json({ error: "Error getting bookings data from db"});
        };
        return res.status(200).json({
            data: bookings
        });
    } catch(err){
        console.error("Error getting bookings data from db", err);
    }
};

export const addBooking = async(req,res) => {
    try {
        const user = req.user;
        if (!user || user.id) {
            return res.status(404).json({ message: "Not valid user" });
        };
        await bookingModel.add({
            user_id: user.id,
            planet_id: req.params.id,
            status: 'pending',
            space_id: req.body.space_id,
            ticket_id: generateId('TKT'),
            departure_station: req.body.departure_station
        });
        return res.status(200).json({ message: "Booking added successfuly!" });
    } catch(err) {
        console.error("Error adding new booking:", err);
    }
};

export const showBookings = async(req,res) => {
    try {
        const user = req.user;
        if (!user){
            return res.status(401).json({ error: "Not a valid user" });
        };
        const bookings = await bookingModel.findByUserId(user.id);
        res.status(200).json({
            data: bookings
        });
    } catch(err) {
        console.log("Error finding user specific bookings:", err);
    }
};

export const cancelBooking = async(req,res) => {
    try {
        const bookingId = req.params.id;
        const booking = await bookingModel.findById(bookingId);
        if(!booking || !booking[0]) {
            res.status(404).json({ message: "Booking not found to be cancelled" });
        };
        await bookingModel.edit({
            status: 'cancelled',
            booking_id: bookingId
        });
        return res.status(200).json({
            message: "Successfully cancelled booking",
        });
    } catch(err) {
        console.error("Error cancling booking:", err);
    }
}

export const editBookings = async(req,res) => {
    try {
        const bookingId = req.params.id;
        const booking = await bookingModel.findById(bookingId);
        if(!booking || !booking[0]){
            res.status(404).json({ message: "Booking not found" });
        };
        await bookingModel.edit({
           status: req.body.status,
           booking_id: bookingId
        });
        return res.status(200).json({
            message: "Successfully edited booking status",
        });
    } catch(err) {
        console.error("Error editing booking status in db:", err);
    }
};

export const csvExportBookings = async(req,res) => {
    try {
        const data = await bookingModel.findAll();
        if (!data) {
            console.log('Failed getting data from db:');
            return null 
        }
        const fields = ['booking_id','user_id','planet_id','status','space_id','ticket_id','departure_station','created_at']
        const json2csvParser = new Parser({ fields });
        const csvData = json2csvParser.parse(data)
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=planet_data.csv');
        return res.status(200).send(csvData);
    } catch (err) {
        console.error("Error exporting bookings data", err);
    }
};