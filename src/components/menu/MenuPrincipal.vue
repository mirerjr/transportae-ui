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
                <!-- TODO: Tornar active os itens do menu abertos -->
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
                @click="goToInicio()"
            />
            <BtnMenu  
                texto="Itinerários" 
                :icone="PhPath" 
                @click="$router.push('/itinerarios')"
            />
            <BtnMenu  
                texto="Avisos"
                :icone="PhBell" 
            />
            <!-- Listar ultimos status de itinerarios -->
            <!-- <button class="text-gray-800 focus:outline-none">
                <PhGear class="text-2xl" />
            </button> -->
        </div>
    </div>
</template>
<script setup>
import { PhBell, PhHouse, PhPath, PhGear, PhSignOut, PhCaretDown, PhUser } from '@phosphor-icons/vue';
import { router } from '../../routes';
import { reactive, ref, onMounted } from 'vue';

import ImgUsuario from '../ImgUsuario.vue';
import BtnMenu from './BtnMenu.vue';
import usuarioService from '../../services/usuario-service';
import filters from '../../utils/filters';

const usuario = reactive({
    nome: '',
    perfil: ''
});

const perfilUsuario = ref('');

onMounted(async () => {
    try {
        const resultado = await usuarioService.getUsuarioLogado();
        const { nome, perfil } = resultado.data;

        usuario.nome = filters.getPrimeiroUltimoNome(nome);
        usuario.perfil = getPerfilUsuario(perfil);
        perfilUsuario.value = perfil;

    } catch (erro) {
        console.log("Erro ao buscar os dados do usuário logado", erro);
        router.push('/login');
    }
});

function getPerfilUsuario(perfil) {
    const perfis = {
        ADMIN: 'Administrador',
        MOTORISTA: 'Motorista',
        ALUNO: 'Aluno'
    };

    return perfis[perfil];
}

async function goToInicio() {
    if (perfilUsuario.value == 'ADMIN') {
        await router.push('/admin');
    } else {
        await router.push('/');
    }
}
</script>