import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    console.log('📧 Tentative d\'envoi d\'email pour:', name);

    // Validation des données
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Envoi d'email avec Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: process.env.GMAIL_USER || 'votre-email@gmail.com', // REMPLACEZ ICI
        subject: `Nouvelle demande EBF - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Nouvelle demande de diagnostic EBF</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
              <p><strong>Nom complet:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
            <hr style="margin: 20px 0;">
            <p style="color: #64748b; font-size: 12px;">
              Reçu depuis l'application EBF Bouaké - ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error('❌ Erreur Resend:', errorData);
      return NextResponse.json(
        { 
          success: false,
          error: 'Erreur lors de l\'envoi de l\'email' 
        },
        { status: 500 }
      );
    }

    const emailData = await resendResponse.json();
    console.log('✅ Email envoyé avec succès:', emailData);

    return NextResponse.json(
      { 
        success: true,
        message: 'Email envoyé avec succès' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur interne du serveur' 
      },
      { status: 500 }
    );
  }
}
