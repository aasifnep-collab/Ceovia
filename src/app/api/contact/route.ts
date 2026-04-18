import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const ContactSchema = z.object({
  inquiryType: z.enum(['consumer', 'clinic', 'distributor']),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(10).max(4000),
  subject: z.string().trim().min(2).max(180),
  companyOrClinic: z.string().trim().max(160).optional().default(''),
})

// ─── Resend delivery ──────────────────────────────────────────────────────────
// Requires RESEND_API_KEY and CONTACT_EMAIL_TO in environment.
// In dev/staging without a key, submissions are logged to stdout only.

async function deliverViaResend(submission: {
  inquiryType: string
  name: string
  email: string
  subject: string
  message: string
  companyOrClinic: string
  submittedAt: string
  ip: string
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_EMAIL_TO ?? 'hello@ceovia.com'
  const fromAddress = process.env.CONTACT_EMAIL_FROM ?? 'CEOVIA Contact <contact@ceovia.com>'

  if (!apiKey) {
    // No key configured — log only (dev / staging without credentials)
    console.log(
      JSON.stringify({
        event: 'contact_submission',
        delivery: 'log_only',
        warning: 'RESEND_API_KEY not set — email not sent',
        ...submission,
      }),
    )
    return { ok: true }
  }

  const body = [
    `Inquiry Type: ${submission.inquiryType}`,
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Company / Clinic: ${submission.companyOrClinic || '—'}`,
    `Subject: ${submission.subject}`,
    '',
    `Message:`,
    submission.message,
    '',
    `Submitted: ${submission.submittedAt}`,
    `IP: ${submission.ip}`,
  ].join('\n')

  let res: Response
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toEmail],
        reply_to: submission.email,
        subject: `[CEOVIA] ${submission.inquiryType.toUpperCase()} — ${submission.subject}`,
        text: body,
      }),
    })
  } catch (fetchErr) {
    return {
      ok: false,
      error: fetchErr instanceof Error ? fetchErr.message : 'Network error reaching Resend',
    }
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    return { ok: false, error: `Resend ${res.status}: ${detail}` }
  }

  return { ok: true }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    )
  }

  const parsed = ContactSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Please complete all required fields with valid information.',
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  const submission = {
    ...parsed.data,
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get('user-agent') ?? 'unknown',
    ip:
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown',
  }

  const delivery = await deliverViaResend(submission)

  if (!delivery.ok) {
    console.error(
      JSON.stringify({
        event: 'contact_delivery_failed',
        error: delivery.error,
        submittedAt: submission.submittedAt,
        inquiryType: submission.inquiryType,
      }),
    )
    return NextResponse.json(
      {
        error:
          'Your message was received but could not be delivered. Please try again or email us directly at hello@ceovia.com.',
      },
      { status: 500 },
    )
  }

  console.log(
    JSON.stringify({
      event: 'contact_submission_delivered',
      inquiryType: submission.inquiryType,
      submittedAt: submission.submittedAt,
    }),
  )

  return NextResponse.json({
    success: true,
    message:
      'Your enquiry has been received. A CEOVIA team member will follow up shortly.',
  })
}
