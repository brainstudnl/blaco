let locale = 'en-GB';

/**
 * Set the locale to use for formatting dates.
 */
export function setLocale(newLocale?: string) {
  if (newLocale) locale = newLocale;
}

/**
 * Get the locale used for formatting dates.
 */
export function getLocale() {
  return locale;
}
