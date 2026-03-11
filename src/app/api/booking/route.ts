import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, date, slot } = body;

    if (!name || !email || !date || !slot) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    // Configurer le transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email de notification pour Wevlap
    await transporter.sendMail({
      from: `"Callaps" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFICATION_EMAIL || "contact@wevlap.fr",
      subject: `Nouveau RDV Callaps — ${name} (${date} à ${slot})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; padding: 32px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #06b6d4; margin: 0;">Nouveau rendez-vous</h1>
            <p style="color: #94a3b8; margin-top: 8px;">Un prospect souhaite échanger avec vous</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; width: 120px;">Date</td>
                <td style="padding: 8px 0; color: white; font-weight: 600;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8;">Créneau</td>
                <td style="padding: 8px 0; color: #06b6d4; font-weight: 600;">${slot} — 30 min</td>
              </tr>
              <tr style="border-top: 1px solid rgba(255,255,255,0.1);">
                <td style="padding: 12px 0 8px; color: #94a3b8;">Nom</td>
                <td style="padding: 12px 0 8px; color: white;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #06b6d4;">${email}</a></td>
              </tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #94a3b8;">Téléphone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #06b6d4;">${phone}</a></td></tr>` : ""}
              ${company ? `<tr><td style="padding: 8px 0; color: #94a3b8;">Entreprise</td><td style="padding: 8px 0; color: white;">${company}</td></tr>` : ""}
            </table>
          </div>

          ${
            message
              ? `<div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <p style="color: #94a3b8; margin: 0 0 8px;">Message :</p>
              <p style="color: white; margin: 0; line-height: 1.6;">${message}</p>
            </div>`
              : ""
          }

          <div style="text-align: center; color: #64748b; font-size: 12px;">
            <p>Envoyé depuis callaps.fr</p>
          </div>
        </div>
      `,
    });

    // Email de confirmation pour le prospect
    await transporter.sendMail({
      from: `"Callaps — Wevlap" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Votre rendez-vous Callaps — ${date} à ${slot}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; padding: 32px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #06b6d4; margin: 0;">Rendez-vous confirmé !</h1>
            <p style="color: #94a3b8; margin-top: 8px;">Merci ${name}, nous avons hâte d'échanger avec vous.</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; width: 120px;">📅 Date</td>
                <td style="padding: 8px 0; color: white; font-weight: 600;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8;">🕐 Heure</td>
                <td style="padding: 8px 0; color: #06b6d4; font-weight: 600;">${slot}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8;">⏱️ Durée</td>
                <td style="padding: 8px 0; color: white;">30 minutes</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin-bottom: 24px;">
            <p style="color: #94a3b8; line-height: 1.6;">Un membre de notre équipe vous contactera à l'heure convenue. Si vous avez besoin de modifier ce rendez-vous, répondez simplement à cet email.</p>
          </div>

          <div style="text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px;">
            <p>Callaps — Un produit <a href="https://wevlap.fr" style="color: #06b6d4;">Wevlap</a></p>
            <p>contact@wevlap.fr · 06 51 37 03 95</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Rendez-vous confirmé et emails envoyés",
    });
  } catch (error) {
    console.error("Erreur booking:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
