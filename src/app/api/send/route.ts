import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Envoi via Resend
    await resend.emails.send({
      from: "EBF App <onboarding@resend.dev>",
      to: "ebfbouake@gmail.com",
      subject: "Nouvelle demande client EBF",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Nouvelle demande depuis ton site</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l’envoi :", error);
    return NextResponse.json({ success: false, error });
  }
}
