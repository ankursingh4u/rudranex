import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface ContactPayload {
  name: string;
  email?: string;
  company?: string;
  projectType: string;
  timeline?: string;
  budget?: string;
  details: string;
}

function buildEmailText(data: ContactPayload): string {
  return [
    "RUDRANEX CONTACT INQUIRY",
    "========================",
    `Name:         ${data.name}`,
    `Email:        ${data.email || "—"}`,
    `Company:      ${data.company || "—"}`,
    `Project type: ${data.projectType}`,
    `Timeline:     ${data.timeline || "—"}`,
    `Budget:       ${data.budget || "—"}`,
    "",
    "Message:",
    "--------",
    data.details,
  ].join("\n");
}

function buildEmailHtml(data: ContactPayload): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#94a3b8;font-size:13px;white-space:nowrap">${label}</td><td style="padding:6px 0;font-size:13px;color:#f5f5f5">${value}</td></tr>`;

  return `<!DOCTYPE html>
<html>
<body style="background:#000117;font-family:system-ui,sans-serif;color:#f5f5f5;padding:32px">
  <div style="max-width:580px;margin:0 auto;border:1px solid rgba(255,255,255,0.1);border-radius:16px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#2563eb22,#7c3aed11);padding:24px 32px;border-bottom:1px solid rgba(255,255,255,0.08)">
      <p style="margin:0;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#2563eb">New Inquiry</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:700">Rudranex Contact Form</h1>
    </div>
    <div style="padding:28px 32px">
      <table style="border-collapse:collapse;width:100%">
        ${row("Name", data.name)}
        ${row("Email", data.email || "—")}
        ${row("Company", data.company || "—")}
        ${row("Project", data.projectType)}
        ${row("Timeline", data.timeline || "—")}
        ${row("Budget", data.budget || "—")}
      </table>
      <div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08)">
        <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#94a3b8">Message</p>
        <p style="margin:0;font-size:14px;line-height:1.7;white-space:pre-wrap;color:#e2e8f0">${data.details}</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let data: ContactPayload;

  try {
    data = await request.json() as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!data.name?.trim() || !data.details?.trim()) {
    return NextResponse.json({ error: "Name and message are required" }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      // Dynamic import so the route still works even if nodemailer is not yet installed
      const nodemailer = await import("nodemailer").catch(() => null);
      if (nodemailer) {
        const transporter = nodemailer.default.createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT ?? 587),
          secure: Number(SMTP_PORT) === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        });

        await transporter.sendMail({
          from: `"Rudranex Website" <${SMTP_USER}>`,
          to: CONTACT_TO ?? "support@rudranex.com",
          replyTo: data.email || undefined,
          subject: `[Inquiry] ${data.projectType} — ${data.name}`,
          text: buildEmailText(data),
          html: buildEmailHtml(data),
        });
      }
    } catch (err) {
      console.error("[contact] Email delivery failed:", err);
    }
  } else {
    console.log("[contact] SMTP not configured — submission received:\n" + buildEmailText(data));
  }

  return NextResponse.json({ success: true });
}
