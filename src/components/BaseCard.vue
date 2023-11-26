<template>
    <section class="bg-white font-gudea rounded-2xl p-8 text-gray-800 min-w-fit">
        <header class="flex flex-row justify-start mb-6">
            <h3 class=" text-4xl inline-flex items-center">
                <slot name="cabecalho" />
            </h3>
        </header>
        <slot name="conteudo" />
        <footer>
            <slot name="rodape" />
        </footer>        
    </section>
</template>