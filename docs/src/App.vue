<script setup lang="ts">
import Drawer from './components/Drawer.vue';
import PageHeader from './components/PageHeader.vue';
</script>

<template>
    <div class="app-wrapper">
        <Drawer position="left" :open="true" as="header">
            <PageHeader as="div"/>
        </Drawer>
        <main class="page-content">
            <!-- route outlet -->
            <RouterView :key="$route.path"></RouterView>
		</main>
    </div>
</template>

<style scoped lang="scss">
    .app-wrapper {
        width: 100vw;
        min-height: 100vh;
        display: flex;
        flex-wrap: nowrap;
        container-name: wrapper;
        container-type: size;
		overflow-y: scroll;
    }
    .page-content {
        padding: 1rem;
        scroll-behavior: smooth;

        @container wrapper (min-width: 1000px) {
            padding: 1rem 2rem;
        }
    }
</style>
