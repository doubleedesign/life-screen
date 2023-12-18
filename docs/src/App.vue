<script lang="ts">
import { defineComponent } from 'vue';
import Drawer from './components/Drawer.vue';
import PageHeader from './components/PageHeader.vue';
import MainContent from './components/MainContent.vue';

export default defineComponent({
	components: {
		MainContent,
		Drawer,
		PageHeader
	},
});
</script>

<template>
    <div class="app-wrapper">
        <Drawer position="left" as="header">
            <PageHeader as="div"/>
        </Drawer>
		<MainContent>
			<!-- route outlet -->
			<RouterView :key="$route.path"></RouterView>
		</MainContent>
    </div>
</template>

<style scoped lang="scss">
    .app-wrapper {
        min-width: 100vw;
        min-height: 100vh;
        display: flex;
        flex-wrap: nowrap;
        container-name: wrapper;
        container-type: size;
		overflow-y: scroll;
    }
</style>
