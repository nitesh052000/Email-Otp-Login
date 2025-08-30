import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendMail(to: string, subject: string, text: string, html?: string) {
  const info = await transporter.sendMail({
    from: `"Email Otp" <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    text,
    html,
  });

  console.log("Email sent:", info.messageId);
}
