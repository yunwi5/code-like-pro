export const AppProperty = {
    APP_NAME: 'CodeLikePro',
    SERVER_DOMAIN: 'https://code-like-pro-production.up.railway.app',
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
};

if (!AppProperty.GOOGLE_CLIENT_ID) {
    console.error('Google client ID is EMPTY!');
}