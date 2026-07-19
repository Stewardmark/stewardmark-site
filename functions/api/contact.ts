// Cloudflare Pages Function: POST /api/contact
//
// Validates the contact form, verifies the Cloudflare Turnstile token
// server-side, then sends the message through Resend. Both secrets come from
// environment variables set on the Pages project (never committed):
//   - TURNSTILE_SECRET_KEY  (Turnstile "Secret Key")
//   - RESEND_API_KEY        (Resend API key)
//
// Any method other than POST returns 405 automatically, because only
// onRequestPost is exported.

interface Env {
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  organization?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
  token?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

// This endpoint only accepts POST. Answer other methods explicitly.
export function onRequestGet(): Response {
  return json({ ok: false, error: 'Method not allowed.' }, 405);
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  // --- Parse -------------------------------------------------------------
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400);
  }

  const name = str(payload.name).replace(/[\r\n]+/g, ' ');
  const email = str(payload.email);
  const organization = str(payload.organization);
  const phone = str(payload.phone);
  const interest = str(payload.interest);
  const message = str(payload.message);
  const token = str(payload.token);

  // --- Validate ----------------------------------------------------------
  if (
    !name ||
    name.length > 200 ||
    !EMAIL_RE.test(email) ||
    email.length > 320 ||
    !interest ||
    interest.length > 200 ||
    !message ||
    message.length > 5000 ||
    organization.length > 200 ||
    phone.length > 50 ||
    !token
  ) {
    return json({ ok: false, error: 'Please check the form and try again.' }, 400);
  }

  // --- Verify Turnstile --------------------------------------------------
  if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY) {
    // Misconfiguration, not the visitor's fault.
    return json({ ok: false, error: 'The form is not configured yet.' }, 503);
  }

  const verifyBody = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) verifyBody.set('remoteip', ip);

  let verified = false;
  try {
    const verifyRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: verifyBody,
      }
    );
    const outcome = (await verifyRes.json()) as { success?: boolean };
    verified = outcome.success === true;
  } catch {
    verified = false;
  }

  if (!verified) {
    return json(
      { ok: false, error: 'Verification failed. Please try again.' },
      400
    );
  }

  // --- Send via Resend ---------------------------------------------------
  const text =
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Organization: ${organization || '(not provided)'}\n` +
    `Phone: ${phone || '(not provided)'}\n` +
    `Interest: ${interest}\n\n` +
    `${message}\n`;

  try {
    const sendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Stewardmark <site@stewardmark.ai>',
        to: ['info@stewardmark.ai'],
        reply_to: email,
        subject: `Website inquiry: ${name}`,
        text,
      }),
    });

    if (!sendRes.ok) {
      return json(
        { ok: false, error: 'Could not send your message right now.' },
        502
      );
    }
  } catch {
    return json(
      { ok: false, error: 'Could not send your message right now.' },
      502
    );
  }

  return json({ ok: true });
}
