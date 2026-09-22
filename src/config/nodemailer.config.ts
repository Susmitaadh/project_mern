import nodemailer from "nodemailer";
import ENV_CONFIG from "./env.config";

//* nodmailer transporter
const transporter = nodemailer.createTransport({
  host: ENV_CONFIG.SMTP_HOST,
  service: ENV_CONFIG.SMTP_SERVICE,
  port: ENV_CONFIG.SMTP_PORT,
  secure: ENV_CONFIG.SMTP_PORT === 465,
  auth: {
    user: ENV_CONFIG.SMTP_USER,
    pass: ENV_CONFIG.SMTP_PASS,
  },
});
//"ogva dbin qsef ibbn",

export const verifySmtpServer = async () => {
  try {
    await transporter.verify();
    console.log("server is ready to send an email");
  } catch (error) {
    console.log(error);
  }
};

export default transporter;


