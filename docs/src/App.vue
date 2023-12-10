<script setup lang="ts">
// @ts-ignore
import data from '../../server/spec.yaml';
import { Spec } from './types.ts';
const spec: Spec = data;
</script>

<template>
    <h1>{{spec.info.title}}</h1>
    <p>{{spec.info.description}}</p>
    <h3 v-for="tag in spec.tags">{{tag.name}}</h3>
</template>

<style scoped lang="scss">
</style>
