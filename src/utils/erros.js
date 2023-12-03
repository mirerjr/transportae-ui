class ErroPadrao extends Error {
    constructor(message, codigoStatus) {
        super(message);
        this.name = "ErroPadrao"
        this.codigoStatus = codigoStatus
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

class ErroTokenExpirado extends Error {
    constructor(message, token) {
        super(message);
        this.name = "ErroTokenExpirado"
    }
}

export {
    ErroPadrao,
    ErroValidacao,
    ErroPrimeiroAcesso,
    ErroTokenExpirado,
}