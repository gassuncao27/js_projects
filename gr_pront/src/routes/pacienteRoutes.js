const express = require('express');
const router = express.Router();
const pacienteController = require('/Users/gabrielassuncao/Gabriel/js_projects/gr_pront/controllers/pacienteController');
const Paciente = require('/Users/gabrielassuncao/Gabriel/js_projects/gr_pront/models/paciente')

router.post('/pacientes', async (req, res) => {
    const { 
        nome_completo, data_nascimento, sexo, email, profissao, 
        nome_mae, telefone, cpf_nr, id_nr, cnh_nr, planosaude_empresa, 
        planosaude_numero, endereco_cep, endereco_estado, endereco_cidade, 
        endereco_rua, endereco_numero, endereco_complemento, endereco_bairro } = req.body;
    
    const novoPaciente = new Paciente(
        nome_completo, data_nascimento, sexo, email, profissao, nome_mae, 
        telefone, cpf_nr, id_nr, cnh_nr, planosaude_empresa, planosaude_numero, 
        endereco_cep, endereco_estado, endereco_cidade, endereco_rua, endereco_numero, 
        endereco_complemento, endereco_bairro);

    try {
        await pacienteController.gravarPaciente(novoPaciente);
        res.status(201).send('Paciente inserido com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao inserir paciente');
    }
});

module.exports = router;
