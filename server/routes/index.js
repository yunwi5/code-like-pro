const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Test if the auth protection works
router.get('/protected', ensureAuthenticated, (req, res) => {
    res.json({
        message:
            'Welcome to the protected route. Only authenticated users can access this route.',
    });
});

module.exports = router;
