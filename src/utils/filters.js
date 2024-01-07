function formatarHoraMinuto(horario) {
    const [hora, minuto] = horario.split(':');
    return `${hora}:${minuto}`;
}

export default {
    formatarHoraMinuto
}