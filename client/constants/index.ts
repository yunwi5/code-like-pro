export const AppProperty = {
  APP_NAME: 'CodeLikePro',
  SERVER_DOMAIN: process.env.NEXT_PUBLIC_SERVER_DOMAIN ?? 'http://localhost:8080',
  CLIENT_DOMAIN: 'https://code-like-pro.vercel.app', // FIX THIS
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
};

if (!AppProperty.GOOGLE_CLIENT_ID) {
  console.error('Google client ID is EMPTY!');
}
