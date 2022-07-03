import nodemailer from 'nodemailer';
import { SendMailOptions } from 'nodemailer';

export async function sendEmail(payload: SendMailOptions) {
  const creds = await nodemailer.createTestAccount();

  const smtp = {
    user: creds.user,
    pass: creds.pass,
    host: creds.smtp.host,
    port: creds.smtp.port,
    secure: false,
  };

  const transporter = nodemailer.createTransport({
    ...smtp,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  transporter.sendMail(payload, (err, info) => {
    if (err) {
      console.log(err, 'Error sending email');
      return;
    }
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}
