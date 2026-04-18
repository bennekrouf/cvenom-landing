'use client';
// src/components/RefCapture.tsx
//
// Reads ?ref= from the URL and stores it in localStorage as 'cvenom_ref'.
// The cvenom studio frontend reads this on the first API request and sends
// it as the X-Referral-Code header.

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function RefCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref && ref.trim()) {
      localStorage.setItem('cvenom_ref', ref.trim());
    }
  }, [searchParams]);

  return null;
}
