export function debounce(funcao, intervalo) {
    let temporizador;

    return function (...args) {
        if (temporizador) clearTimeout(temporizador);
        
        temporizador = setTimeout(() => {
            funcao.apply(this, args);
            temporizador = null;

        }, intervalo)
    }
}
