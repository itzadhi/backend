import nodemailer from 'nodemailer';

const mailTransporter = () => {
  return nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'adhithyanalan1@outlook.com',
      pass: process.env.MAILER_PASS,
    },
  });
};

export { mailTransporter };
