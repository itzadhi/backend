import { mailTransporter } from './mailTransporter.js';

const sendActivationMail = (name, email, verifyID) => {
  const transporter = mailTransporter();

  let mailDetails = {
    from: 'adhithyanalan1@outlook.com',
    to: email,
    subject: 'Activate your account',
    html: `<p>Hello ${name} 👋</p> 
    <p>Please click the below link to activate your account.</p>
    <a href="${process.env.Client_URL}/user/verify-email/${verifyID}" target="_blank">Activate</a>`,
  };

  transporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log('Error in sending mail');
    } else {
      console.log('Email sent successfully');
    }
  });
};

export { sendActivationMail };
