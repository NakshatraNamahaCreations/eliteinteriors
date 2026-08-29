import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* Mail sending needs the Node runtime, not the edge runtime. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Fields every form on the site may send. All optional except name + phone. */
type Enquiry = {
  name?: string;
  email?: string;
  phone?: string;
  roomType?: string;
  houseType?: string;
  project?: string;
  service?: string;
  message?: string;
  /** Which form the enquiry came from, used in the subject line. */
  source?: string;
  /** Honeypot — real users never fill this in. */
  company?: string;
};

const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  roomType: "Type of Room",
  houseType: "Type of House",
  project: "Project type",
  service: "Service",
  message: "Message",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Strip CR/LF so a submitted value can't inject extra mail headers. */
function clean(value: unknown, max = 2000) {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: Enquiry;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend it worked so bots don't retry.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const data: Record<string, string> = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    roomType: clean(body.roomType, 60),
    houseType: clean(body.houseType, 60),
    project: clean(body.project, 60),
    service: clean(body.service, 80),
    message: clean(body.message, 5000),
  };

  // Forms differ on which of phone/email they mark required, so accept either.
  if (!data.name || (!data.phone && !data.email)) {
    return NextResponse.json(
      { error: "Please provide your name and a phone number or email." },
      { status: 400 }
    );
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, FORMSUBMIT_TO } =
    process.env;

  const source = clean(body.source, 60) || "Website";
  const rows = Object.entries(LABELS)
    .filter(([key]) => data[key])
    .map(([key, label]) => ({ label, value: data[key] }));

  const port = Number(SMTP_PORT) || 465;

  /**
   * Fallback delivery via formsubmit.co — used when no SMTP credentials are
   * configured, or when the SMTP server rejects them. Needs no API key; the
   * destination inbox activates it once by clicking the link in the first mail.
   */
  async function sendViaFormSubmit() {
    if (!FORMSUBMIT_TO) return false;
    const origin = new URL(request.url).origin;
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(FORMSUBMIT_TO)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // formsubmit rejects requests with no originating page
            Origin: origin,
            Referer: origin + "/",
          },
          body: JSON.stringify({
            _subject: `New enquiry (${source}) - ${data.name}`,
            _template: "table",
            _captcha: "false",
            ...Object.fromEntries(rows.map((r) => [r.label, r.value])),
            Source: source,
          }),
        }
      );
      const out = await res.json().catch(() => ({}));
      console.log("[contact] formsubmit:", res.status, JSON.stringify(out));
      // a 200 with success:"false" is still a failure
      return res.ok && String(out?.success) === "true";
    } catch (err) {
      console.error("[contact] formsubmit failed:", err);
      return false;
    }
  }

  if (!SMTP_USER || !SMTP_PASS) {
    if (await sendViaFormSubmit()) return NextResponse.json({ ok: true });
    console.error("[contact] No working mail delivery is configured.");
    return NextResponse.json(
      { error: "Mail is not configured on the server." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    const info = await transporter.sendMail({
      // Gmail rewrites From to the authenticated account, so send as ourselves
      // and put the enquirer on Reply-To instead.
      from: `"Elite Interiors Website" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: data.email || undefined,
      subject: `New enquiry (${source}) — ${data.name}`,
      text: rows
        .map((r) => `${r.label}: ${r.value}`)
        .concat(`Source: ${source}`)
        .join("\n"),
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#222">
          <h2 style="margin:0 0 16px">New enquiry from the website</h2>
          <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
            ${rows
              .map(
                (r) =>
                  `<tr><td style="border:1px solid #e5e5e5;background:#fafafa"><strong>${escapeHtml(
                    r.label
                  )}</strong></td><td style="border:1px solid #e5e5e5">${escapeHtml(
                    r.value
                  ).replace(/\n/g, "<br>")}</td></tr>`
              )
              .join("")}
            <tr><td style="border:1px solid #e5e5e5;background:#fafafa"><strong>Source</strong></td><td style="border:1px solid #e5e5e5">${escapeHtml(
              source
            )}</td></tr>
          </table>
        </div>
      `,
    });
    console.log("[contact] sent:", info.messageId, nodemailer.getTestMessageUrl(info) || "");
  } catch (error) {
    console.error("[contact] SMTP send failed, trying fallback:", error);
    if (await sendViaFormSubmit()) return NextResponse.json({ ok: true });
    return NextResponse.json(
      { error: "Could not send your message. Please call us instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
