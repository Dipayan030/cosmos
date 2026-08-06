import { BrevoClient } from "@getbrevo/brevo";

const brevoClient = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

export const sendEmail = async (htmlContent,subject,to) => {
    try{
        await brevoClient.transactionalEmails.sendTransacEmail({
            htmlContent: htmlContent,
            sender: {
                email: process.env.EMAIL_USER,
                name: "COSMOS COMMAND",
            },
            subject: subject,
            to: [
                {
                    email: to.email,
                    name: to.name,
                },
            ],
        });
        
    } catch(err){
        console.error("Falied connecting to Brevo Client:", err);
    }
};