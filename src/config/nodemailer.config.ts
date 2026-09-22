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

export const verifySmtpServer = async () => {
  try {
    await transporter.verify();
    console.log("server is ready to send an email");
  } catch (error) {
    console.log(error);
  }
};

export default transporter;


