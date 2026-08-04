import { Resend } from 'resend';

// Only initialize if the API key is present
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailPayload) {
  if (!resend) {
    console.warn('Resend API Key is missing. Email will not be sent.');
    console.warn(`Attempted to send to ${to} with subject: ${subject}`);
    return { success: false, error: 'Resend API key missing' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Shree Sai Services <noreply@shreesaiservices.com>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Email send failed:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error sending email:', error);
    return { success: false, error: 'Unexpected error' };
  }
}

// Pre-built template for Tax Return updates
export function buildTaxReturnEmail(clientName: string, year: string, status: string) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #0056b3;">Tax Return Update</h2>
      <p>Dear ${clientName},</p>
      <p>Your Tax Return for Assessment Year <strong>${year}</strong> has been updated.</p>
      <p>Current Status: <strong style="color: #d9534f;">${status}</strong></p>
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #777;">
        Log in to your client portal to view full details and upload any missing documents.
      </p>
    </div>
  `;
}
