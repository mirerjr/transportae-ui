<template>
    <div class="px-7 bg-white shadow-md rounded-2xl mb-4">
        <div class="flex items-center justify-between py-4 text-gray-600 select-none">
            <div class="relative group cursor-pointer">
                <button class="flex items-center text-left">
                    <ImgUsuario :nome="'Mirer'" />
                    <div class="hidden md:flex md:flex-col ml-2">
                        <span class="text-sm font-bold text-gray-800 whitespace-nowrap">{{ usuario.nome }}</span>
                        <span class="text-xs">{{ usuario.perfil }}</span>
                    </div>
                    <PhCaretDown class="ml-1 pl-0.5 mt-1" />
                </button>
                <ul class="mt-0 pt-1 absolute hidden rounded bg-white shadow-md text-sm text-gray-600 group-hover:block">
                    <li
                        @click="$router.push('/perfil')"
                        class="flex p-3 items-center hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400"
                    >
                        <PhUser class="text-lg" />
                        Meu Perfil
                    </li>
                    <li
                        class="flex p-3 items-center hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400"
                        @click="$router.push('/login')"
                    >
                        <PhSignOut class="text-lg" />
                        Sair
                    </li>
                </ul>
            </div>
            <BtnMenu  
                texto="Início" 
                :icone="PhHouse" 
                @click="$router.push('/')"
            />
            <BtnMenu  
                texto="Itinerário" 
                :icone="PhPath" 
                @click="$router.push('/')"
            />
            <BtnMenu  
                texto="Avisos"
                :icone="PhBell" 
            />
            <!-- <button class="text-gray-800 focus:outline-none">
                <PhGear class="text-2xl" />
            </button> -->
        </div>
    </div>
</template>
<script setup>
import { PhBell, PhHouse, PhPath, PhGear, PhSignOut, PhCaretDown, PhUser } from '@phosphor-icons/vue';
import { router } from '../../routes';
import { reactive, onMounted } from 'vue';

import ImgUsuario from '../ImgUsuario.vue';
import BtnMenu from './BtnMenu.vue';
import usuarioService from '../../services/usuario-service';

const usuario = reactive({
    nome: '',
    perfil: ''
});

onMounted(async () => {
    try {
        const resultado = await usuarioService.getUsuarioLogado();
        const { nome, perfil } = resultado.data;

        usuario.nome = getPrimeiroUltimoNome(nome);
        usuario.perfil = getPerfilUsuario(perfil);

    } catch (erro) {
        console.log("Erro ao buscar os dados do usuário logado", erro);
        router.push('/login');
    }
});

function getPrimeiroUltimoNome(nomeCompleto) {
    const nomes = nomeCompleto.split(' ');
    const primeiroNome = nomes[0];
    const ultimoNome = nomes[nomes.length - 1];

    return `${primeiroNome} ${ultimoNome}`;
}

function getPerfilUsuario(perfil) {
    const perfis = {
        ADMIN: 'Administrador',
        MOTORISTA: 'Motorista',
        ALUNO: 'Aluno'
    };

    return perfis[perfil];
}
</script>