const express = require('express');
const bodyParser = require('body-parser');
const pacienteRoutes = require('../src/routes/pacienteRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir arquivos estáticos
app.use(express.static('public'))
app.use(bodyParser.json());
app.use('/api', pacienteRoutes);

// Rotas
app.use('/', require('./routes/index'));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
