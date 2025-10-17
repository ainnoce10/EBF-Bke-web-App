// app/api/send/route.js ou pages/api/send.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { nom, telephone, quartier, position, mapsLink, autoriseContact } = await request.json();
    
    console.log('Données reçues:', { nom, telephone, quartier, position });

    // Validation des champs requis
    if (!nom || !telephone) {
      return NextResponse.json(
        { error: 'Le nom et le téléphone sont requis' },
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
        to: process.env.GMAIL_USER || 'ebfbouake@gmail.com',
        subject: `Nouvelle demande EBF - ${nom}`,
        html: `
          <h2>Nouvelle demande de diagnostic EBF</h2>
          <p><strong>Nom complet:</strong> ${nom}</p>
          <p><strong>Téléphone:</strong> ${telephone}</p>
          <p><strong>Quartier:</strong> ${quartier || 'Non spécifié'}</p>
          <p><strong>Position:</strong> ${position || 'Non spécifié'}</p>
          <p><strong>Lien Google Maps:</strong> <a href="${mapsLink}">${mapsLink}</a></p>
          <p><strong>Autorise contact:</strong> ${autoriseContact ? 'Oui' : 'Non'}</p>
          <hr>
          <p><em>Reçu depuis l'application EBF Bouaké</em></p>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error('Erreur Resend:', errorData);
      throw new Error('Erreur lors de l\'envoi de l\'email');
    }

    const emailData = await resendResponse.json();
    console.log('Email envoyé avec succès:', emailData);

    return NextResponse.json(
      { 
        success: true,
        message: 'Demande envoyée avec succès ! Nous vous contacterons rapidement.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création de la demande',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
