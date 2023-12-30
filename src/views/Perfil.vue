<template>
    <div class="grid gap-4 gap grid-cols-1 md:grid-cols-2 md:gap-36">
        <BaseCard>
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
                <BaseValue 
                    campo="Endereço"
                    :valor="usuario.endereco"
                    :isCarregando="isCarregando"
                />
            </template>
            <template #rodape>                
            </template>
        </BaseCard>
        <BaseCard>
        </BaseCard>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import usuarioService from '../services/usuario-service';
import { ErroPadrao } from '../utils/erros'
import BaseCard from '../components/BaseCard.vue';
import BaseValue from '../components/form/BaseValue.vue';
import { PhUser } from '@phosphor-icons/vue';

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