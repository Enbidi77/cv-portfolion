import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Simple spam protection: honeypot check
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const apiKey = process.env.EMAIL_SERVICE_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!apiKey || !contactEmail) {
      // If email service is not configured, log the message and return success
      // This allows the form to work during development
      console.log("Contact form submission:", {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: "Message received successfully",
      });
    }

    // Email service integration point
    // Replace this with your preferred email service (Resend, SendGrid, etc.)
    // Example with Resend:
    //
    // const resend = new Resend(apiKey);
    // await resend.emails.send({
    //   from: 'Portfolio <noreply@yourdomain.com>',
    //   to: contactEmail,
    //   subject: `Portfolio Contact: ${subject}`,
    //   text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    // });

    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
