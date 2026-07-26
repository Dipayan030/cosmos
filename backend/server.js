import express, { json } from 'express';
import cors from 'cors';
import { BrevoClient } from '@getbrevo/brevo';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: join(__dirname , '/.env') });
};

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://cosmos-tqs9.onrender.com'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(json());

const client = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

app.post('/api/checkout' , async (req,res) => {
    const {fullName , email , spaceId , destination , ticketId} = req.body;
    if (!fullName || !email){
        return res.status(400).json({ error: 'Missing vital telemetry payload metrics.' });
    }
    
    await client.transactionalEmails.sendTransacEmail({
        htmlContent: `
          <div style="background-color: #050505; color: #ffffff; font-family: monospace; padding: 30px; border: 1px solid #22d3ee; border-radius: 8px;">
            <h2 style="color: #22d3ee; letter-spacing: 2px; margin-bottom: 20px;">LAUNCH CONFIRMATION RECORD</h2>
            <p style="color: #a3a3a3;">LOG ENTRY STATION: CAPE CANAVERAL ORBIT-1</p>
            <p style="color: #a3a3a3; border-bottom: 1px solid #333; padding-bottom: 15px;">TRANSMISSION STATUS: SECURED // ENCRYPTED</p>
            
            <p style="font-size: 16px;">Greetings, <strong>${fullName.toUpperCase()}</strong>.</p>
            <p>This transmission confirms that your orbital pass has been officially locked into our core database network.</p>
            
            <div style="background-color: #111; padding: 15px; border-left: 4px solid #22d3ee; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #22d3ee;">MISSION BRIEFING READOUT:</h4>
              <p style="margin: 5px 0;"><strong>Destined Sector:</strong> ${destination.toUpperCase()}</p>
              <p style="margin: 5px 0;"><strong>Assigned Fleet Quarters:</strong> 3S</p>
              <p style="margin: 5px 0;"><strong>Launch Matrix ID:</strong> #${ticketId}</p>
            </div>
            
            <p style="color: #a3a3a3; font-size: 12px; margin-top: 30px;">Please ensure your biometric space passports are fully updated before the 48-hour departure launch window.</p>
            <p style="color: #22d3ee; margin-top: 20px;">— COSMOS TRAVEL INC. COMMAND TERMINAL</p>
          </div>
        `,
        sender: {
            email: process.env.EMAIL_USER,
            name: "COSMOS COMMAND",
        },
        subject: "Hello from COSMOS",
        to: [
            {
                email: email,
                name: fullName,
            },
        ],
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[SERVER] Space command running smoothly on port http://localhost:${PORT}`));