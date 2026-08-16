import { bookingModel } from "../models/booking.model.js";

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