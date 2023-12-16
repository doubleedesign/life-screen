<script setup lang="ts">
import Menu from './components/Menu.vue';
import { useSpecStore } from './state/store';
const spec = useSpecStore();
</script>

<template>
    <header>
        <h1>{{spec.info.title}}</h1>
        <p>{{spec.info.description}}</p>
    </header>
    <Menu/>
    <!-- route outlet -->
    <router-view></router-view>
</template>

<style scoped lang="scss">
</style>
