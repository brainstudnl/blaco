import { slugify } from './slugify';

export function getAvatarUrl(name: string) {
  return `/images/users/${slugify(name)}.jpeg`;
}
