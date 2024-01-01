function setErros(dados) {
    const erros = {};

    for (const campo in dados) {
        const isCampoAninhado = typeof dados[campo] === 'object' && dados[campo] !== null;

        if (isCampoAninhado) {
            erros[campo] = setErros(dados[campo]);
        } else {
            erros[campo] = [];
        }
    }

    return erros;
}

export default {
    setErros,
}