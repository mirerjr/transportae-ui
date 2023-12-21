<template>
    <div class="grid grid-cols-1 gap-4 justify-items-center xl:gap-36">
        <BaseCard class="w-full md:w-3/4 lg:w-2/4 xl:w-2/5">
            <template #cabecalho>
                <PhGear class="mr-2" />
                Painel de Controle
            </template>
            <template #conteudo>
                <!-- <p class="text-2xl font-gudea mb-4">
                    Selecione uma das opções para começar.
                </p> -->
                <section class="w-fit mx-auto grid grid-cols-2 gap-4 justify-items-center sm:grid-cols-4 ">
                    <CardBtn @click="$router.push('/instituicoes')">
                        <PhBuildings weight="light" class="text-3xl" /> Instituições de Ensino
                    </CardBtn>
                    <CardBtn>
                        <PhBus weight="light" class="text-3xl" /> Linhas de Ônibus
                    </CardBtn>
                    <CardBtn @click="$router.push('/usuarios')">
                        <PhUser weight="light" class="text-3xl" /> Usuários Cadastrados
                    </CardBtn>
                    <CardBtn>
                        <PhPath weight="light" class="text-3xl" /> Itinerários executados
                    </CardBtn>
                </section>
            </template>
        </BaseCard>
    </div>
</template>

<script setup>
import { PhGear, PhBuildings, PhUser, PhBus, PhPath } from '@phosphor-icons/vue';
import BaseCard from '../components/BaseCard.vue'
import CardBtn from '../components/CardBtn.vue';
</script>