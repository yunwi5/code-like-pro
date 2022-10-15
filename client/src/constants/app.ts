export const AppProperty = {
    APP_NAME: 'CodeLikePro',
    // SERVER_DOMAIN: 'https://code-like-pro-production.up.railway.app',
    SERVER_DOMAIN:
        process.env.NODE_ENV === 'production'
            ? 'https://code-like-pro-production.up.railway.app'
            : 'http://localhost:8080',
};
