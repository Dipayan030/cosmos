const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    },
})

app.post('/api/checkout' , async (res,req) => {
    const {fullName , email , spaceId , destination , ticketId} = req.body;
})