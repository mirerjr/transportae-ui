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
                />
                <BaseValue 
                    campo="Email"
                    :valor="usuario.email"
                />
                <BaseValue 
                    campo="Telefone"
                    :valor="usuario.telefone"
                />
                <BaseValue 
                    campo="CPF"
                    :valor="usuario.cpf"
                />
                <BaseValue 
                    campo="Matrícula"
                    :valor="usuario.matricula"
                />
                <BaseValue 
                    campo="Endereço"
                    :valor="usuario.endereco"
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

const props = defineProps(['usuarioId']);

const usuario = ref({});

onMounted(async () => {
    await getUsuario(props.usuarioId);
});

async function getUsuario(id) {
    try {
        const resultado = id 
            ? await usuarioService.getUsuario(id)
            : await usuarioService.getUsuarioLogado();

        usuario.value = resultado.data;

    } catch (erro) {
        if (erro instanceof ErroPadrao) {
            // erro.codigoStatus
        }
    }
}
</script>