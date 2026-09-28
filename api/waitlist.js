/**
 * POST /api/waitlist — emails a waitlist sign-up to you via Resend.
 *
 * A Vercel serverless function: drop this folder next to the site and Vercel
 * deploys it with no server to run. The Resend key stays here, never in the
 * browser. Locally, `vite.config.js` mounts this same handler on the dev
 * server, so `npm run dev` works too.
 *
 * Environment (set in Vercel → Settings → Environment Variables, or `.env`):
 *   RESEND_API_KEY        required
 *   WAITLIST_TO_EMAIL     where sign-ups land (your inbox)
 *   WAITLIST_FROM_EMAIL   optional; defaults to Resend's test sender, which
 *                         can only deliver to the address on your Resend
 *                         account until you verify a domain
 */

/** Overridable so tests can point at a local mock. */
const RESEND_ENDPOINT = process.env.RESEND_ENDPOINT || "https://api.resend.com/emails";
const DEFAULT_FROM = "PropFlow Waitlist <onboarding@resend.dev>";
const MAX_FIELD = 500;

const ROLES = { pmc: "Property management company", landlord: "Landlord", tenant: "Tenant" };

function readBody(req) {
  if (req.body !== undefined) {
    return Promise.resolve(typeof req.body === "string" ? JSON.parse(req.body) : req.body);
  }
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 20_000) reject(new Error("Body too large"));
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

const clean = (value) => (typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "");
const escapeHtml = (value) => value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_TO_EMAIL;
  if (!apiKey || !to) {
    return send(res, 500, { error: "Waitlist email is not configured" });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return send(res, 400, { error: "Invalid request body" });
  }

  // Honeypot: real people never see or fill this field.
  if (clean(body.website)) return send(res, 200, { ok: true });

  const entry = {
    role: ROLES[body.role] ?? clean(body.role),
    name: clean(body.name),
    email: clean(body.email),
    company: clean(body.company),
    units: clean(body.units),
    wish: clean(body.wish),
    page: clean(body.page),
  };

  if (!entry.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email)) {
    return send(res, 400, { error: "A name and a valid email are required" });
  }

  const rows = [
    ["Role", entry.role],
    ["Name", entry.name],
    ["Email", entry.email],
    ["Company", entry.company],
    ["Units", entry.units],
    ["Wants first", entry.wish],
    ["From page", entry.page],
  ].filter(([, value]) => value);

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;color:#0F1E33;max-width:560px">
      <h2 style="margin:0 0 4px;font-size:18px">New waitlist sign-up</h2>
      <p style="margin:0 0 16px;color:#7F8CA0;font-size:13px">${escapeHtml(new Date().toUTCString())}</p>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `<tr>
              <td style="padding:6px 16px 6px 0;color:#7F8CA0;vertical-align:top">${label}</td>
              <td style="padding:6px 0">${escapeHtml(value)}</td>
            </tr>`,
          )
          .join("")}
      </table>
    </div>`;

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.WAITLIST_FROM_EMAIL || DEFAULT_FROM,
      to: [to],
      reply_to: entry.email,
      subject: `Waitlist: ${entry.name}${entry.company ? ` · ${entry.company}` : ""} (${entry.role || "unknown role"})`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Resend error", response.status, detail);
    return send(res, 502, { error: "Could not send the email right now" });
  }

  return send(res, 200, { ok: true });
}
