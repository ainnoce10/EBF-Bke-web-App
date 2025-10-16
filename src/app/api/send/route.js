import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request) {
  // Vérifiez que la clé API est présente
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY manquante');
    return NextResponse.json(
      { error: 'Configuration serveur manquante' },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'votre-email@gmail.com', // ← Remplacez par votre email
      reply_to: email,
      subject: `Nouveau message de ${name.trim()}`,
      text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div>
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        { error: 'Échec de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    console.log('Email envoyé avec succès:', data);
    return NextResponse.json({ 
      success: true, 
      message: 'Message envoyé avec succès' 
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur de traitement de la requête' },
      { status: 500 }
    );
  }
}