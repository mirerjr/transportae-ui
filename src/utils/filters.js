import { format } from "date-fns";

function formatarHoraMinuto(horario) {
    const [hora, minuto] = horario.split(':');
    return `${hora}:${minuto}`;
}

function formatarDataHora(data) {
    return format(new Date(data), 'dd/MM/yyyy HH:mm');
}

function getPrimeiroUltimoNome(nomeCompleto) {
    const nomes = nomeCompleto.split(' ');
    const primeiroNome = nomes[0];
    const ultimoNome = nomes[nomes.length - 1];

    return `${primeiroNome} ${ultimoNome}`;
}

export default {
    formatarDataHora,
    formatarHoraMinuto,
    getPrimeiroUltimoNome,
}