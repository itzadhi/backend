import mailTransporter from './mailTransporter.js';

const sendActivationMail = (user) => {
  const transporter = mailTransporter();

  let mailDetails = {
    from: 'adhithyanalan1@outlook.com',
    to: user.email,
    subject: 'Activate your account',
    html: `<p>Hello ${user.name} 👋</p> 
    <p>Please click the below link to activate your account.</p>
    <a href="${process.env.Client_URL}/user/verify-email/${user.userName}" target="_blank">Activate</a>`,
  };

  transporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log('Error');
    } else {
      console.log('Email sent successfully');
    }
  });
};

export { sendActivationMail };
