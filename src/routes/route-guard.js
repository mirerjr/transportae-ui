import usuarioService from "../services/usuario-service";

export const beforeEachGuard = (to, from) => {
    if (['forbbiden', 'not-found', 'login'].includes(to.name)) return;

    const requerAutenticacao = !usuarioService.isUsuarioLogado() && to.name != "login";
    
    if (requerAutenticacao || usuarioService.isTokenExpirado()) {
        return { 
            name: "login" 
        };
    }

    if (to.meta.perfil && to.meta.perfil != usuarioService.getPerfilUsuario()) {
        return { 
            name: "forbbiden",
            query: {
                rotaAnterior: from.name
            }
        };
    }
}