export function getUrl(path: string) {
  const url = new URL(
    process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000/',
  );
  url.pathname = path;
  return url.toString();
}
