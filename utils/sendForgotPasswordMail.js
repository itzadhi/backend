import { mailTransporter } from './mailTransporter.js';

const sendForgotPasswordMail = (name, email, tempToken) => {
  const transporter = mailTransporter();

  let mailDetails = {
    from: 'adhithyanalan@gmail.com',
    to: email,
    subject: 'Forgot your account',
    html: `<p>Hello ${name} 👋</p> 
    <p>Please click the below link to set your new password.</p>
    <a href="${process.env.Client_URL}/user/new-password/${tempToken}" target="_blank">Activate</a>`,
  };

  transporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log('Error in sending forgot password mail');
    } else {
      console.log('Forgot password email sent successfully');
    }
  });
};

export { sendForgotPasswordMail };
