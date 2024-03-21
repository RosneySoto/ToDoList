const { createTransport } = require('nodemailer');

const test_mail = process.env.APP_MAIL_NODEMAILER;

//Quien envia el mail
const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.APP_MAIL_NODEMAILER,
        pass: process.env.APP_PASS_NODEMAILER
    }
});

//funcion para el envio del mail, recibe un objeto por parametro
async function enviarMail(mailOptions) {
    try {
        const info = await transporter.sendMail(mailOptions);
        // console.log(info);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {enviarMail}