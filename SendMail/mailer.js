import { config } from "dotenv";
import nodemailer from "nodemailer";
config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.API_KEY,
    pass: process.env.SECRET_KEY,
  },
});

export default transporter;
