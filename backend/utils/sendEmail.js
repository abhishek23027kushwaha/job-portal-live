import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // TLS/STARTTLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: `"Job Portal" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html || `<p>${options.message.replace(/\n/g, "<br/>")}</p>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", info.messageId);
        return info;
    } catch (err) {
        console.error("❌ Email sending failed:", err.message);
        throw new Error(`Email sending failed: ${err.message}`);
    }
};

export default sendEmail;
