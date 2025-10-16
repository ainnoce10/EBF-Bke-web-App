"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="w-full p-4 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </Link>
            <h1 className="ml-4 text-2xl font-bold text-blue-900">Mentions Légales</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Éditeur du site</h2>
              <div className="text-gray-700 space-y-2">
                <p><strong>EBF Bouaké</strong></p>
                <p>Électricité - Bâtiment - Froid</p>
                <p>Bouaké, Côte d'Ivoire</p>
                <p>Téléphone : +225 XX XX XX XX XX</p>
                <p>Email : contact@ebfbouake.ci</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Directeur de publication</h2>
              <div className="text-gray-700 space-y-2">
                <p><strong>Nom du Directeur</strong></p>
                <p>Responsable éditorial</p>
                <p>Email : direction@ebfbouake.ci</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Hébergeur</h2>
              <div className="text-gray-700 space-y-2">
                <p><strong>Nom de l'hébergeur</strong></p>
                <p>Adresse de l'hébergeur</p>
                <p>Téléphone de l'hébergeur</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Propriété intellectuelle</h2>
              <div className="text-gray-700 space-y-2">
                <p>L'ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété exclusive d'EBF Bouaké et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.</p>
                <p>Toute reproduction, distribution, modification ou utilisation de ces éléments sans autorisation écrite préalable est strictement interdite.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Limitation de responsabilité</h2>
              <div className="text-gray-700 space-y-2">
                <p>EBF Bouaké s'efforce de fournir des informations précises et à jour sur ce site. Cependant, nous ne pouvons garantir l'exactitude, l'exhaustivité ou l'actualité des informations fournies.</p>
                <p>EBF Bouaké ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site ou des informations qu'il contient.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. Loi applicable</h2>
              <div className="text-gray-700 space-y-2">
                <p>Les présentes mentions légales sont régies par la loi ivoirienne. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux de Bouaké.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. Contact</h2>
              <div className="text-gray-700 space-y-2">
                <p>Pour toute question concernant ces mentions légales, vous pouvez nous contacter à :</p>
                <p>Email : legal@ebfbouake.ci</p>
                <p>Téléphone : +225 XX XX XX XX XX</p>
                <p>Adresse : [Adresse complète], Bouaké, Côte d'Ivoire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-gray-500">
            © 2025 EBF Bouaké - Électricité - Bâtiment - Froid
          </p>
        </div>
      </footer>
    </main>
  );
}