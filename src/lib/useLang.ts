'use client';

import { usePathname } from 'next/navigation';

/**
 * Derives the current language from the URL pathname.
 * `/fr/...` → 'fr', everything else → 'en'.
 * This is the single source of truth — avoids the stale-localStorage bug
 * where components kept rendering in the old lang after URL navigation.
 */
export function useLang(): 'en' | 'fr' {
  const pathname = usePathname();
  if (pathname?.startsWith('/fr')) return 'fr';
  return 'en';
}
