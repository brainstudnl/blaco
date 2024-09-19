import { getLocale } from './config';

const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export function getHumanReadableDate(date: string): string {
  const locale = getLocale();
  return new Date(date).toLocaleDateString(locale, options);
}
