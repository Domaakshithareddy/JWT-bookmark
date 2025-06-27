const express = require('express');
const router  = express.Router();

// e.g. GET /api/auth/ping
router.get('/ping', (req, res) => res.json({ ok: true }));

module.exports = router;   // ← must export the router itself
