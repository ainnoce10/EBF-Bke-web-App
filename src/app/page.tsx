"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">
          Bienvenue sur EBF
        </h1>
        <p className="text-center max-w-md mb-6 text-gray-600">
          Enregistrez vos problèmes d’électricité, en audio ou texte, et recevez un diagnostic gratuit.
        </p>
        <Link href="/enregistrement">
          <Button className="mt-2">Commencer</Button>
        </Link>
      </main>
    </Suspense>
  );
}
