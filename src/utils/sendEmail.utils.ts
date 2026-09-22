import ENV_CONFIG from "../config/env.config";
import transporter from "../config/nodemailer.config";
import { MailOptions } from "nodemailer/lib/json-transport";

interface IMailOption {
  to: string | string[];
  subject: string;
  html: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachemnts?: any[];
}

export const sendEmail = async ({
  to,
  subject,
  html,
  cc,
  bcc,
  attachemnts,
}: IMailOption) => {
  const options: MailOptions = {
    to,
    from: ENV_CONFIG.SMTP_MAIL_FROM,
    subject,
    html,
  };
  if (cc) {
    options["cc"] = cc;
  }
  if (bcc) {
    options["bcc"] = bcc;
  }
  if (attachemnts) {
    options["attachments"] = attachemnts;
  }

  try {
    await transporter.sendMail(options);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
};
