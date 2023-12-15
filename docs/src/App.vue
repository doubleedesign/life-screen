<script setup lang="ts">
import Menu from './components/Menu.vue';
import data from '../../server/spec.yaml';
import { Spec } from './types.ts';
const spec: Spec = data as Spec;
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
