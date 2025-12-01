import commonFR from '@/i18n/fr/common.json';

export const messages = {
  fr: {
    common: commonFR,
  },
};

export const locales = ['fr'] as const;
export const defaultLocale = 'fr' as const;

export async function getMessages(locale: string) {
  return messages[locale as keyof typeof messages];
}

export type Locale = keyof typeof messages;
