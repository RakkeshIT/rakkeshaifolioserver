import { Request, Response, Router } from "express";
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
const router = Router();
dotenv.config()

router.post("/contact", async (req: Request, res: Response) => {
  try {
    const { email, message } = req.body

    if (!email || !message) {
      return res.status(400).json({ error: "Email and Message Required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

   await transporter.sendMail({
  from: `"Portfolio Contact" <${process.env.EMAIL}>`,
  to: process.env.EMAIL,
  subject: "📨 New Contact Message from Portfolio",
  html: `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f4f4f5; border-radius: 10px; border: 1px solid #ddd;">
      <h2 style="color: #1f2937; text-align: center;">New Message from Portfolio</h2>
      
      <div style="margin-top: 20px; padding: 15px; background: #fff; border-radius: 8px; border: 1px solid #e5e7eb;">
        <p style="margin: 0; font-size: 14px;"><strong>Visitor Email:</strong> ${email}</p>
        <p style="margin-top: 10px; font-size: 14px;"><strong>Message:</strong></p>
        <p style="margin-top: 5px; font-size: 14px; line-height: 1.5;">${message}</p>
      </div>

      <p style="margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center;">
        This message was sent via your portfolio contact form.
      </p>
    </div>
  `,
});


    return res.status(200).json({ message: "Mail Sent Success" });
  } catch (error) {
    return res.status(500).json({ message: "Mail UnSuccess" });
  }
});

export default router;
