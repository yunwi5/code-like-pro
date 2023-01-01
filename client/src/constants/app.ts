export const AppProperty = {
    APP_NAME: 'CodeLikePro',
    // SERVER_DOMAIN: 'https://code-like-pro-production.up.railway.app',
    SERVER_DOMAIN:
        process.env.NODE_ENV === 'production'
            ? 'https://code-like-pro-production.up.railway.app'
            : 'http://localhost:8080',

    // Production frontend domain
    CLIENT_DOMAIN: 'https://code-like-pro.vercel.app',

    GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
};

if (AppProperty.GOOGLE_CLIENT_ID) {
    console.log('Google client ID is VALID');
} else {
    console.log('Google client ID is EMPTY!');
}
