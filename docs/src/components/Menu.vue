<script setup lang="ts">
import { useSpecStore } from '../state/store';
const spec = useSpecStore();
</script>

<template>
    <nav>
        <ul>
            <li v-for="item in spec.routes">
                <router-link :to="item.path">{{item.label}}</router-link>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
</style>
