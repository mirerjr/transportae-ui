class ErroPadrao extends Error {
    constructor(message) {
        super(message);
        this.name = "ErroPadrao"
    }
}

class ErroValidacao extends Error {
    campos = [];     
    constructor(message, campos) {
        super(message);
        this.name = "ErroValidacao"
        this.campos = campos
    }
}

class ErroPrimeiroAcesso extends Error {
    constructor(message, token) {
        super(message);
        this.name = "ErroPrimeiroAcesso"
        this.token = token
    }
}

export {
    ErroPadrao,
    ErroValidacao,
    ErroPrimeiroAcesso,
}