import en from '../messages/en.json';
import fr from '../messages/fr.json';
import { Translations } from './types';

const translations: Record<'en' | 'fr', Translations> = { en, fr };

export function useTranslation(lang: 'en' | 'fr'): Translations {
  return translations[lang] || translations.en;
}

export const supportedLanguages = ['en', 'fr'] as const;
export const defaultLanguage = 'en';
