<script lang="ts">
import Drawer from './components/Drawer.vue';
import PageHeader from './components/PageHeader.vue';
import { defineComponent } from 'vue';

export default defineComponent({
	components: {
		Drawer,
		PageHeader
	},
	data() {
		// TODO: Share drawer's open state and adjust the content width accordingly
	}
});
</script>

<template>
    <div class="app-wrapper">
        <Drawer position="left" :open="true" as="header">
            <PageHeader as="div"/>
        </Drawer>
        <main :class="['page-content']">
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
		flex-grow: 1;

        @container wrapper (min-width: 1100px) {
            padding: 1rem 2rem;
        }
    }
</style>
