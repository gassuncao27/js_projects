require('dotenv').config();
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

console.log(pacienteExemplo.nome_completo)

async function gravarPaciente(paciente) {
    const client = new Client({
        user: process.env.USERDB,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: Number(process.env.PORT),
    });

    let ids = await procurarPaciente({ nome: paciente.nome_completo, cpf: paciente.cpf_nr, email: paciente.email });

    await client.connect();

    if ( ids.length === 0) {
            console.log('Paciente nao encontrado. Gravando nome.');
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
    } else {
        console.log('Paciente já registrado.');
        await client.end();
    }
};


async function procurarPaciente({ nome, cpf, email }) {
    const client = new Client({
        user: process.env.USERDB,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: Number(process.env.PORT),
    });

    await client.connect();    

    let query = `
        SELECT id_paciente FROM paciente WHERE 
    `;
    const conditions = [];
    const values = [];

    if (nome) {
        values.push(`%${nome}%`);
        conditions.push(`nome_completo ILIKE $${values.length}`);
    }
    if (cpf) {
        values.push(cpf);
        conditions.push(`cpf_nr = $${values.length}`);
    }
    if (email) {
        values.push(email);
        conditions.push(`email = $${values.length}`);
    }

    if (conditions.length === 0) {
        console.log('Nenhum critério de busca fornecido.');
        await client.end();
        return [];
    }

    query += conditions.join(' OR ');

    try {
        const res = await client.query(query, values);
        const ids = res.rows.map(row => row.id_paciente);
        console.log('Pacientes encontrados:', ids);
        return ids;
    } catch (err) {
        console.error('Erro ao procurar pacientes:', err);
        return [];
    } finally {
        await client.end();
    }
}

// module.exports = { gravarPaciente };
gravarPaciente(pacienteExemplo);

// proximos passos:
// normalizar o nome, o cpf para procurar algo similar no banco. 
