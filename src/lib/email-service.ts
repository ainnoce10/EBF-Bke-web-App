import { Resend } from 'resend';

export class EmailService {
  private static instance: EmailService;
  private resend: Resend;
  private targetEmail: string;

  private constructor() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error('❌ Clé API Resend manquante. Vérifie ton .env.local ou les variables sur Vercel.');
      throw new Error('Missing RESEND_API_KEY');
    }

    this.resend = new Resend(apiKey);
    this.targetEmail = process.env.TARGET_EMAIL || 'ebfbouake@gmail.com';
  }

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  isConfigured(): boolean {
    return !!process.env.RESEND_API_KEY;
  }

  async sendEmailWithAttachments(data: {
    customerName: string;
    customerPhone: string;
    neighborhood?: string;
    latitude?: number | null;
    longitude?: number | null;
    type: 'TEXT' | 'AUDIO';
    description?: string;
    transcription?: string;
    audioUrl?: string;
    photoUrl?: string;
    hasPhoto: boolean;
    requestDate: string;
    requestId: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('📧 Préparation du contenu email via Resend...');

      const html = `
        <h2>Nouvelle demande client</h2>
        <p><strong>Nom :</strong> ${data.customerName}</p>
        <p><strong>Téléphone :</strong> ${data.customerPhone}</p>
        <p><strong>Quartier :</strong> ${data.neighborhood || 'Non précisé'}</p>
        <p><strong>Date :</strong> ${data.requestDate}</p>
        <p><strong>Type :</strong> ${data.type}</p>
        ${data.description ? `<p><strong>Description :</strong> ${data.description}</p>` : ''}
        ${data.transcription ? `<p><strong>Transcription :</strong> ${data.transcription}</p>` : ''}
        ${data.audioUrl ? `<p><a href="${data.audioUrl}">🎧 Écouter le message audio</a></p>` : ''}
        ${data.photoUrl ? `<p><a href="${data.photoUrl}">📷 Voir la photo</a></p>` : ''}
        ${data.latitude && data.longitude ? `<p><a href="https://www.google.com/maps?q=${data.latitude},${data.longitude}">📍 Voir la position sur Google Maps</a></p>` : ''}
      `;

      const result = await this.resend.emails.send({
        from: 'EBF App <onboarding@resend.dev>',
        to: this.targetEmail,
        subject: `Nouvelle demande de ${data.customerName}`,
        html,
      });

      console.log('✅ Email envoyé via Resend:', result.id || 'OK');
      return { success: true };
    } catch (error: any) {
      console.error('❌ Erreur Resend:', error);
      return { success: false, error: error.message || 'Erreur lors de l\'envoi via Resend' };
    }
  }
}
