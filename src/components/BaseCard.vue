<template>
    <section class="bg-white font-gudea rounded-2xl p-6 md:p-8 text-gray-800">
        <header class="flex flex-row justify-between mb-6">
            <h3 class=" text-4xl inline-flex items-center text-gray-700">
                <slot name="cabecalho" />
            </h3>
            <div class="justify-end">
                <slot name="cabecalho-btn" />
            </div>
        </header>
        <slot name="conteudo" />
        <footer>
            <slot name="rodape" />
        </footer>        
    </section>
</template>