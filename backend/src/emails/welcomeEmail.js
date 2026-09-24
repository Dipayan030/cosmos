export const welcomeEmail = (userName) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Syne:wght@400..800&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'Space Grotesk', sans-serif; background-color: #000000; padding: 20px; color: white; display: flex; flex-direction: column; align-items: center;">
      <span style="max-width: 500px;">
        <h3 style="font-family: 'Syne', sans-serif; text-align: center; font-size: 16px;">COSMOS</h3>
        <h2 style="font-size: 24px; font-weight: 500; margin: 40px 0px 60px 0px; text-align: center;">Your Journey Beyond Begins Here</h2>
        <p style="font-size: 15px; font-weight: 200; margin-bottom: 48px; max-width: 500px; color: rgba(255, 255, 255, 0.9);">
          Dear ${userName},<br><br>Welcome to COSMOS. You have taken your first step toward an extraordinary voyage across the stars. 
          Whether your destination is the Moon, Mars, Europa, or Titan, our Quantum-class starships are built to deliver world-class 
          luxury and uncompromising safety. 
        </p>
        <h3>How to start your first journey with us?</h3>
        <p style="font-size: 15px; font-weight: 200; margin-bottom: 48px; margin-bottom: 30px; font-weight: 100; color: rgba(255, 255, 255, 0.9)"><span style="font-family: 'Space Mono', monospace; color: white; opacity: 0.6; font-size: 12px;">01 </span> Choose a destination and book</p>
        <p style="font-size: 15px; font-weight: 200; margin-bottom: 48px; margin-bottom: 30px; font-weight: 100; color: rgba(255, 255, 255, 0.9)"><span style="font-family: 'Space Mono', monospace; color: white; opacity: 0.6; font-size: 12px;">02 </span> Get a confirmation email</p>
        <p style="font-size: 15px; font-weight: 200; margin-bottom: 48px; margin-bottom: 30px; font-weight: 100; color: rgba(255, 255, 255, 0.9)"><span style="font-family: 'Space Mono', monospace; color: white; opacity: 0.6; font-size: 12px;">03 </span> Start your journey</p>
        <section style="min-width: 100%; min-height: 200px; background-image: url('https://res.cloudinary.com/ithcqaje/image/upload/v1790269995/hero.png'); background-size: contain; background-position: center; background-repeat: no-repeat;"></section>
        <span style="display: flex; justify-content: center; font-weight: 200; margin-top: 80px; margin-bottom: 80px;">
          <a style="color: white;" href="https://cosmos-tqs9.onrender.com/destinations">Explore Destinations</a>
        </span>
        <p>Warm regards,<br>The COSMOS Team</p>
      </span>
    </body>
    </html>
  `;
}