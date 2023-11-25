import usuarioService from "../services/usuario-service";

export const beforeEachGuard = (to, from) => {
    const isRotaLogin = to.name == "login";
    const requerAutenticacao = !usuarioService.isUsuarioLogado() && !isRotaLogin;
    
    if (requerAutenticacao) return { name: "login" };
}