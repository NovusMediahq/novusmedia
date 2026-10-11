import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      companyName,
      email,
      phone,
      website,
      services,
      budget,
      deadline,
      description,
      referenceLinks,
      consentGiven,
    } = body;

    // Validate required fields
    if (!fullName || !email || !description || !consentGiven) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build plain-text email body
    const emailBody = `
NEW PROJECT INQUIRY — NOVUS MEDIA
===================================

CLIENT INFORMATION
------------------
Full Name:        ${fullName}
Company:          ${companyName || "—"}
Email:            ${email}
Phone:            ${phone || "—"}
Website:          ${website || "—"}

PROJECT DETAILS
---------------
Services Needed:  ${services && services.length > 0 ? services.join(", ") : "—"}
Budget Range:     ${budget || "—"}
Deadline:         ${deadline || "—"}

PROJECT DESCRIPTION
-------------------
${description}

REFERENCE LINKS
---------------
${referenceLinks || "—"}

===================================
Submitted at: ${new Date().toUTCString()}
    `.trim();

    // Use Resend if RESEND_API_KEY is configured, otherwise fall back to console log
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Novus Media Inquiries <onboarding@resend.dev>",
          to: ["work@novusmedia.in"],
          reply_to: email,
          subject: `New Project Inquiry from ${fullName}${companyName ? ` — ${companyName}` : ""}`,
          text: emailBody,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("[v0] Resend error:", err);
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }
    } else {
      // Development fallback — log submission to console
      console.log("[v0] Project inquiry received (no RESEND_API_KEY set):");
      console.log(emailBody);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[v0] Inquiry route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
