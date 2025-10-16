"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchParamsHandler({ 
  onContactParam 
}: { 
  onContactParam: (hasContact: boolean) => void 
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const contactParam = searchParams.get('contact');
    onContactParam(contactParam === 'true');
  }, [searchParams, onContactParam]);

  return null;
}