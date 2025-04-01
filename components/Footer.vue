<template>
    <UContainer :ui="{ constrained: 'max-w-2xl' }">
        <div class="flex justify-center items-center">
            <div class="p-2 w-28">
                <NuxtLink to="/">
                    <img src="/img/Logotipo sin 50 años-Nimat.png" alt="LOGO">
                </NuxtLink>
            </div>
            <div class="text-center p-2">|</div>
            <div class="text-center p-2">
                Copyright © {{ new Date().getFullYear() }} By TIyC - Prades S.A.
            </div>
        </div>
    </UContainer>
</template>