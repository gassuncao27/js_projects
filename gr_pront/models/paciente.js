class Paciente {
    constructor(
        nome_completo, data_nascimento, sexo, 
        email, profissao, nome_mae, telefone, cpf_nr, id_nr, 
        cnh_nr, planosaude_empresa, planosaude_numero, endereco_cep, 
        endereco_estado, endereco_cidade, endereco_rua, endereco_numero, 
        endereco_complemento, endereco_bairro) {
        this.nome_completo = nome_completo;
        this.data_nascimento = data_nascimento;
        this.sexo = sexo;
        this.email = email;
        this.profissao = profissao;
        this.nome_mae = nome_mae;
        this.telefone = telefone;
        this.cpf_nr = cpf_nr;
        this.id_nr = id_nr;
        this.cnh_nr = cnh_nr;
        this.planosaude_empresa = planosaude_empresa;
        this.planosaude_numero = planosaude_numero;
        this.endereco_cep = endereco_cep;
        this.endereco_estado = endereco_estado;
        this.endereco_cidade = endereco_cidade;
        this.endereco_rua = endereco_rua;
        this.endereco_numero = endereco_numero;
        this.endereco_complemento = endereco_complemento;
        this.endereco_bairro = endereco_bairro;
    }
}
