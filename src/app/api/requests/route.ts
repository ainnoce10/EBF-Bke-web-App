import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('📥 API Requests called');
    
    // Essayer de parser le JSON
    let body;
    try {
      body = await request.json();
      console.log('📦 Request body (JSON):', body);
    } catch (jsonError) {
      console.log('❌ JSON parsing failed, trying FormData...');
      
      // Si le JSON échoue, essayer FormData
      const formData = await request.formData();
      body = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        neighborhood: formData.get('neighborhood'),
        position: formData.get('position'),
        inputType: formData.get('inputType'),
        description: formData.get('description'),
        authorized: formData.get('authorized') === 'true'
      };
      console.log('📦 Request body (FormData):', body);
    }

    // Validation basique
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Nom et téléphone sont requis' },
        { status: 400 }
      );
    }

    console.log('💾 Enregistrement simulé (sans DB)');
    
    // 🔹 ENVOI DE L'EMAIL IMMÉDIAT
    try {
      console.log('📧 Envoi immédiat de l\'email...');
      
      const emailText = `
Nouvelle demande de diagnostic EBF

👤 Informations client:
- Nom: ${body.name}
- Téléphone: ${body.phone}
- Quartier: ${body.neighborhood || 'Non spécifié'}
- Position: ${body.position || 'Non spécifié'}

🔧 Description du problème:
${body.description || 'Message vocal'}

📍 Localisation:
${body.mapsLink || 'Non fourni'}

✅ Autorisation de contact: ${body.authorized ? "Oui" : "Non"}

📅 Date: ${new Date().toLocaleString()}
      `.trim();

      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: process.env.GMAIL_USER || 'votre-email@gmail.com',
          subject: `🔌 Nouvelle demande EBF - ${body.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">🔌 Nouvelle demande de diagnostic EBF</h2>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
                <p><strong>👤 Nom complet:</strong> ${body.name}</p>
                <p><strong>📞 Téléphone:</strong> ${body.phone}</p>
                <p><strong>📍 Quartier:</strong> ${body.neighborhood || 'Non spécifié'}</p>
                <p><strong>🗺️ Position:</strong> ${body.position || 'Non spécifié'}</p>
                <p><strong>🔧 Type de demande:</strong> ${body.inputType === "text" ? "Description écrite" : "Message vocal"}</p>
                <p><strong>📝 Description:</strong></p>
                <p>${body.description || 'Message vocal - Veuillez contacter le client'}</p>
                <p><strong>✅ Autorise contact:</strong> ${body.authorized ? "✅ Oui" : "❌ Non"}</p>
              </div>
              <hr style="margin: 20px 0;">
              <p style="color: #64748b; font-size: 12px;">
                📧 Reçu depuis l'application EBF Bouaké - ${new Date().toLocaleString()}
              </p>
            </div>
          `,
        }),
      });

      if (emailResponse.ok) {
        const emailResult = await emailResponse.json();
        console.log('✅ Email envoyé avec succès:', emailResult);
      } else {
        const emailError = await emailResponse.text();
        console.error('❌ Erreur email:', emailError);
      }
    } catch (emailError) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', emailError);
    }

    // Retourner une réponse de succès
    return NextResponse.json({
      success: true,
      message: 'Demande créée avec succès ! Nous vous contacterons rapidement.',
      id: `temp-${Date.now()}`
    });

  } catch (error) {
    console.error('❌ Error in /api/requests:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
