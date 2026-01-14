import { NextRequest, NextResponse } from "next/server";

const RECIPIENT_EMAIL = "1822pinestreetpa@gmail.com";

// Simple spam detection
function isLikelySpam(data: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}): boolean {
  const spamPatterns = [
    /\b(viagra|cialis|casino|lottery|winner|bitcoin|crypto|investment opportunity)\b/i,
    /\b(click here|act now|limited time|free money)\b/i,
    /<[^>]*script/i,
    /https?:\/\/[^\s]+\.(ru|cn|xyz|top|gq|ml|ga|cf)\b/i,
  ];

  const combinedText = `${data.firstName} ${data.lastName} ${data.message}`;

  for (const pattern of spamPatterns) {
    if (pattern.test(combinedText)) {
      return true;
    }
  }

  // Check for excessive links
  const linkCount = (data.message.match(/https?:\/\//gi) || []).length;
  if (linkCount > 3) {
    return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, inquiryType, dates, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !inquiryType || !message) {
      return NextResponse.json(
        { error: "All required fields must be filled out" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Check for spam
    if (isLikelySpam({ firstName, lastName, email, message })) {
      // Return success to not alert spammers, but don't send email
      console.log("Spam detected, not sending:", { email, firstName });
      return NextResponse.json({ success: true });
    }

    // Format the inquiry type for display
    const inquiryTypeLabels: Record<string, string> = {
      booking: "Booking Inquiry",
      general: "General Question",
      history: "Historical Research",
      other: "Other",
    };

    // Build the email content
    const emailSubject = `[Rittenhouse Residence] ${inquiryTypeLabels[inquiryType] || inquiryType} from ${firstName} ${lastName}`;

    const emailBody = `
New inquiry from the Rittenhouse Residence website:

Name: ${firstName} ${lastName}
Email: ${email}
Inquiry Type: ${inquiryTypeLabels[inquiryType] || inquiryType}
${dates ? `Preferred Dates: ${dates}` : ""}

Message:
${message}

---
This message was sent from the contact form at rittenhouseresidence.com
    `.trim();

    // Send email using Resend (you'll need to set up RESEND_API_KEY in env)
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      // In development or if not configured, log the message
      console.log("Would send email:", { to: RECIPIENT_EMAIL, subject: emailSubject, body: emailBody });
      return NextResponse.json({ success: true });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Rittenhouse Residence <onboarding@resend.dev>",
        to: RECIPIENT_EMAIL,
        reply_to: email,
        subject: emailSubject,
        text: emailBody,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API error:", errorData);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
