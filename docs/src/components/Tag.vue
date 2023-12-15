<script lang="ts">
import data from '../../../server/spec.yaml';
import { Spec } from '../types.ts';
const spec: Spec = data as Spec;
export default {
	computed: {
		route() {
			return this.$route.path;
		},
	},
};
</script>

<template>
    <section class="tag-content">
        <header class="tag-content__header">
            <h1>{{route}}</h1>
        </header>
    </section>
</template>

<style scoped lang="scss">
    .tag-content {
        &__header {
            h1 {
                font-size: 1.5rem;
            }
        }
    }
</style>
