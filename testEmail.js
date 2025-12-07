import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  try {
    const data = await resend.emails.send({
      from: "Sagar Tourism <onboarding@resend.dev>",
      to: "yourpersonalemail@gmail.com",
      subject: "Test email",
      html: "<p>This is a test email</p>",
    });

    console.log("SUCCESS:", data);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

test();
