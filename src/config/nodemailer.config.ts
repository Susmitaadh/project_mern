import nodemailer from "nodemailer";

//* nodmailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "susmita4jun@gmail.com",
    pass: "ogva dbin qsef ibbn",
  },
});

export default transporter;

//! Sep 3rd 34:00
