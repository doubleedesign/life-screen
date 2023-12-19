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
        display: flex;
        flex-wrap: nowrap;
        container-name: wrapper;
        container-type: size;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
    }
</style>
