const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests

// Configure your SMTP transporter with Brevo credentials
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // False for port 587
    auth: {
        user: '715121001@smtp-brevo.com',
        pass: 'LvJUxXp5dz8RwKNF'
    }
});

app.post('/send-email', async (req, res) => {
    const { name, phone, city, address, quantity, color, size, totalPrice } = req.body;

    const mailOptions = {
        from: '715121001@smtp-brevo.com',
        to: 'frikha.store@gmail.com',
        subject: 'Nouvelle commande',
        text: `Nom: ${name}\nTéléphone: ${phone}\nVille: ${city}\nAdresse: ${address}\nQuantité: ${quantity}\nCouleur: ${color}\nPointure: ${size} \nPrix: ${totalPrice}`
    };

    try {
        // Log to check if email is being sent
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Server error');
    }
});

// Export the app (no need to call app.listen)
module.exports = app;
