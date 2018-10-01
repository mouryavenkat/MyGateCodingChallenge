const nodemailer = require('nodemailer');
const sendMail = (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: req.body.email_from,
            pass: req.body.password_emailFrom
        }
    });
    var mailOptions = {
        from: req.body.email_from,
        to: req.body.send_to,
        subject: req.body.subject,
        text: req.body.email_body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ code: 500, message: error })
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ code: 200, message: 'Successfully sent Email Invitation' })
        }
    });
}
module.exports.sendMail = sendMail