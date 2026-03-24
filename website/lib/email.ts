import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string) {
  await resend.emails.send({
    from: "Veerd <hello@veerd.co>",
    to: email,
    subject: "You are on the Veerd list",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 20px; color: #2C2C2C;">
        <p style="font-size: 16px; line-height: 1.6;">Thank you for your interest in Veerd.</p>
        <p style="font-size: 16px; line-height: 1.6;">We are putting the finishing touches on the app. We will let you know the moment it is ready — and you will be among the first to get access.</p>
        <p style="font-size: 16px; line-height: 1.6;">In the meantime you can follow our journey on TikTok at <a href="https://tiktok.com/@veerd" style="color: #7D9E8C;">@veerd</a>.</p>
        <p style="font-size: 14px; color: #7A7A72; margin-top: 32px;">— The Veerd team</p>
      </div>
    `,
  });
}

export async function sendTwinConfirmationEmail(email: string, name: string) {
  await resend.emails.send({
    from: "Veerd <hello@veerd.co>",
    to: email,
    subject: "Your Twin application is received",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 20px; color: #2C2C2C;">
        <p style="font-size: 16px; line-height: 1.6;">Hi ${name},</p>
        <p style="font-size: 16px; line-height: 1.6;">Thank you for applying to be a Twin on Veerd. We review every application personally and will be in touch within 48 hours.</p>
        <p style="font-size: 14px; color: #7A7A72; margin-top: 32px;">— The Veerd team</p>
      </div>
    `,
  });
}

export async function sendTwinApplicationNotification(application: {
  name: string;
  email: string;
  currentRole: string;
  previousRole: string;
  transitionYear: string;
  quote: string;
  availabilityTier: string;
  linkedinUrl?: string;
}) {
  await resend.emails.send({
    from: "Veerd <hello@veerd.co>",
    to: "team@veerd.co",
    subject: `New Twin Application: ${application.name}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #2C2C2C;">
        <h2 style="font-size: 20px; margin-bottom: 24px;">New Twin Application</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold;">Name</td><td>${application.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td>${application.email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Current Role</td><td>${application.currentRole}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Previous Role</td><td>${application.previousRole}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Transition Year</td><td>${application.transitionYear}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Quote</td><td>${application.quote}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Tier</td><td>${application.availabilityTier}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">LinkedIn</td><td>${application.linkedinUrl || "Not provided"}</td></tr>
        </table>
      </div>
    `,
  });
}
