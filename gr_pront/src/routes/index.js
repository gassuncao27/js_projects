const express = require('express');
const router = express.Router();

// Rota Principal
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public'});
});

// Rota Index
router.get('/index', (req, res) => {
    res.sendFile('index.html', { root: 'public'});
});

// Rota About
router.get('/about', (req, res) => {
    res.sendFile('about.html', { root: 'public'});
});

// Rota Contact
router.get('/contact', (req, res) => {
    res.sendFile('about.html', { root: 'public'});
});

module.exports = router;
