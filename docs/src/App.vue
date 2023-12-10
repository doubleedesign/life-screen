<script setup lang="ts">
// @ts-ignore
import Tag from './components/Tag.vue';
import data from '../../server/spec.yaml';
import { Spec } from './types.ts';
const spec: Spec = data as Spec;
</script>

<template>
    <header>
        <h1>{{spec.info.title}}</h1>
        <p>{{spec.info.description}}</p>
    </header>
    <template v-for="tag in spec.tags">
        <Tag v-bind:heading="tag.name"/>
    </template>
</template>

<style scoped lang="scss">
</style>
