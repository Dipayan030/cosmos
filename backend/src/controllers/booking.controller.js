import { render } from "@react-email/components";
import { bookingModel } from "../models/booking.model.js";
import { generateId } from "../utils/idGenerator.js";
import { Parser } from "json2csv";
import ConfirmationEmail from "../../dist/emails/ConfirmationEmail.js";
import CancelationEmail from "../../dist/emails/CancelationEmail.js";
import BeginingEmail from "../../dist/emails/BeginingEmail.js";
import CompletionEmail from "../../dist/emails/CompletionEmail.js";
import { sendEmail } from "../utils/brevo.js";

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
        if (!user?.id) {
            return res.status(401).json({ message: "Not valid user" });
        };
        const { space_id, departure_station } = req.body;
        if (!space_id || !departure_station) {
            return res.status(400).json({ message: "Space ID and departure station are required" });
        }
        await bookingModel.add({
            user_id: user.id,
            planet_id: req.params.id,
            status: 'pending',
            space_id,
            ticket_id: generateId('TKT'),
            departure_station
        });
        return res.status(201).json({ message: "Booking added successfully!" });
    } catch(err) {
        console.error("Error adding new booking:", err);
        return res.status(500).json({ message: "Unable to create booking" });
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
        await bookingModel.toggleStatus({
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

export const toggleBookingsStatus = async(req,res) => {
    try {
        const bookingId = req.params.id;
        const newStatus = req.body.status;
        const booking = await bookingModel.findById(bookingId);
        if(!booking || !booking[0]){
            res.status(404).json({ message: "Booking not found" });
        };
        await bookingModel.toggleStatus({
           status: newStatus,
           booking_id: bookingId
        });
        const stsEmails = {
            confirmed : {
                htmlCont : ConfirmationEmail({
                    userFirstname : booking[0]?.name.slice(0 , booking[0]?.name.indexOf(' ')), 
                    destination : booking[0]?.destination, 
                    fullName : booking[0]?.name, 
                    bookingId : booking[0]?.booking_id, 
                    departureStation : booking[0]?.departure_station, 
                    date : booking[0]?.created_at? new Date(booking[0].created_at).toLocaleDateString() : ''
                }),
                subject: 'Booking Confirmed'
            },
            cancelled : {
                htmlCont: CancelationEmail({
                    userFirstname : booking[0]?.name.slice(0 , booking[0]?.name.indexOf(' ')),
                    destination : booking[0]?.destination,
                    bookingId : booking[0]?.booking_id
                }),
                subject: 'Booking Cancelled'
            },
            started : {
                htmlCont: BeginingEmail({
                    userFirstname : booking[0]?.name.slice(0 , booking[0]?.name.indexOf(' ')), 
                    destination : booking[0]?.destination, 
                    bookingId : booking[0]?.booking_id
                }),
                subject: 'Your Journey Has Started'
            },
            completed : {
                htmlCont: CompletionEmail({
                    userFirstname : booking[0]?.name.slice(0 , booking[0]?.name.indexOf(' ')), 
                    destination : booking[0]?.destination
                }),
                subject: 'Journey Completed'
            }
        };
        const htmlContent = await render(stsEmails[newStatus].htmlCont);
        await sendEmail(
            htmlContent,
            stsEmails[newStatus].subject,
            {
                email: booking[0].email,
                name: booking[0].name
            }
        );
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