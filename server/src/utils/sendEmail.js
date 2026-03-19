import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const info = await transporter.sendMail({
      from: `"Marriage App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });

    console.log("Email sent:", info.response);

  } catch (error) {
    console.error("Email error:", error);
  }
};

export default sendEmail;