

import nodemailer from "nodemailer";
import { API_KEY } from "./config";

console.log(API_KEY)

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: 'apikey',
    pass: API_KEY,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(email: string,otp: number) {
    console.log(email,otp, API_KEY)
  // send mail with defined transport object
  const info = await transporter.sendMail({
    
    from: 'hiteshmeshram1407@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔verify your account", // Subject line
    text: otp.toString(), // plain text body
    html: `opt is ${otp}`, // html body
  });

  return {
    message: 'email sent'
  }
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
