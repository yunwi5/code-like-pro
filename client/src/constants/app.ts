export const AppProperty = {
    APP_NAME: 'CodeLikePro',
    // SERVER_DOMAIN: 'https://code-like-pro-production.up.railway.app',
    SERVER_DOMAIN:
        process.env.NODE_ENV === 'production'
            ? 'https://code-like-pro-production.up.railway.app'
            : 'http://localhost:8080',

    // Production frontend domain
    CLIENT_DOMAIN: 'https://code-like-pro.vercel.app',

    GOOGLE_CLIENT_ID:
        '20530639592-9b5j5p0brn412hn5n56mqimsbcmf79lf.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
};
