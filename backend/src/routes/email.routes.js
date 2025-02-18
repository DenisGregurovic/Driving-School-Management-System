const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-email', async (req, res) => {
    const { senderEmail, subject, message } = req.body;
  
    console.log('Primljeni podaci:', { senderEmail, subject, message });
  
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const mailInfo = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: senderEmail,
        subject:senderEmail+' : ' +subject,
        text: message,
      });
  
      console.log('Email poslan:', mailInfo);
      return res.status(200).send({ message: 'Email uspješno poslan!' });
    } catch (error) {
      console.error('Greška prilikom slanja emaila:', error.message || error);
      return res.status(500).send({ message: 'Došlo je do pogreške prilikom slanja emaila.' });
    }
  });
  
  

module.exports = router;
