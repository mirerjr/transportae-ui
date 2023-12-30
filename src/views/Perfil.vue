<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="grid gap-4 md:col-span-1 md:justify-items-end">
            <BaseCard class="w-full lg:w-2/4">
                <template #cabecalho>
                    <PhUser/>
                    Meu perfil
                </template>
                <template #conteudo>
                    <BaseValue 
                        campo="Data de nascimento"
                        :valor="usuario.dataNascimento"
                        :isCarregando="isCarregando"
                    />
                    <BaseValue 
                        campo="Email"
                        :valor="usuario.email"
                        :isCarregando="isCarregando"
                    />
                    <BaseValue 
                        campo="Telefone"
                        :valor="usuario.telefone"
                        :isCarregando="isCarregando"
                    />
                    <BaseValue 
                        campo="CPF"
                        :valor="usuario.cpf"
                        :isCarregando="isCarregando"
                    />
                    <BaseValue 
                        campo="Matrícula"
                        :valor="usuario.matricula"
                        :isCarregando="isCarregando"
                    />
                </template>
                <template #rodape>                
                </template>
            </BaseCard>
            <EnderecoView
                :endereco="usuario?.endereco"
                :isCarregando="isCarregando"
                class="w-full lg:w-2/4"
            />
        </div>
        <InstituicaoView
            :instituicao="usuario?.instituicao"
            :isCarregando="isCarregando"
            class="w-full h-fit lg:w-2/4"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import usuarioService from '../services/usuario-service';
import { ErroPadrao } from '../utils/erros'
import BaseCard from '../components/BaseCard.vue';
import BaseValue from '../components/form/BaseValue.vue';
import { PhUser } from '@phosphor-icons/vue';
import EnderecoView from '../components/EnderecoView.vue';
import InstituicaoView from '../components/InstituicaoView.vue';

const props = defineProps(['id']);

const usuario = ref({});
const isCarregando = ref(false);

onMounted(async () => {
    await getUsuario(props.id);
});

async function getUsuario(id) {
    try {
        isCarregando.value = true;
        
        const resultado = id 
            ? await usuarioService.getUsuario(id)
            : await usuarioService.getUsuarioLogado();

        usuario.value = resultado.data;

    } catch (erro) {
        if (erro instanceof ErroPadrao) {
            // erro.codigoStatus
        }
    } finally {
        isCarregando.value = false;
    }
}
</script>