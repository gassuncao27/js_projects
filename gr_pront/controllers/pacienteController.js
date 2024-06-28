const { Client } = require('pg');
const Paciente = require('../models/paciente.js');

// Exemplo de uso:
const pacienteExemplo = new Paciente(
    "João Silva",
    "1980-01-01",
    "M",
    "joao.silva@example.com",
    "Engenheiro",
    "Maria Silva",
    "11987654321",
    "123.456.789-00",
    "123456789",
    "123456789",
    "Plano Saúde ABC",
    "123456",
    "12345-678",
    "SP",
    "São Paulo",
    "Rua Exemplo",
    "123",
    "Apt 45",
    "Bairro Exemplo"
);


async function gravarPaciente(paciente) {
    const client = new Client({
        user: 'gabrielassuncao',
        host: 'localhost',
        database: 'gabrielassuncao',
        password: 'Senha2733#',
        port: 5432,
    });

    await client.connect();

    const query = `
        INSERT INTO paciente (
            nome_completo,
            data_nascimento,
            sexo,
            email,
            profissao,
            nome_mae,
            telefone,
            cpf_nr,
            id_nr,
            cnh_nr,
            planosaude_empresa,
            planosaude_numero,
            endereco_cep,
            endereco_estado,
            endereco_cidade,
            endereco_rua,
            endereco_numero,
            endereco_complemento,
            endereco_bairro
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
        RETURNING id_paciente;
    `;

    const values = [
        paciente.nome_completo,
        paciente.data_nascimento,
        paciente.sexo,
        paciente.email,
        paciente.profissao,
        paciente.nome_mae,
        paciente.telefone,
        paciente.cpf_nr,
        paciente.id_nr,
        paciente.cnh_nr,
        paciente.planosaude_empresa,
        paciente.planosaude_numero,
        paciente.endereco_cep,
        paciente.endereco_estado,
        paciente.endereco_cidade,
        paciente.endereco_rua,
        paciente.endereco_numero,
        paciente.endereco_complemento,
        paciente.endereco_bairro
    ];

    console.log(values)
    try {
        const res = await client.query(query, values);
        console.log('Paciente inserido com sucesso:', res.rows[0].id_paciente);
    } catch (err) {
        console.error('Erro ao inserir paciente:', err);
    } finally {
        await client.end();
    }
};

// module.exports = { gravarPaciente };
gravarPaciente(pacienteExemplo);
