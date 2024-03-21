import nodemailer from 'nodemailer';

const mailTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'adhithyanalan@gmail.com',
      pass: process.env.MAILER_PASS,
    },
  });
};

export { mailTransporter };
