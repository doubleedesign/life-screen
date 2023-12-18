import { reactive, UnwrapNestedRefs } from 'vue';

interface PageState {
	drawerOpen: boolean
}

export const pageState: UnwrapNestedRefs<PageState> = reactive({
	drawerOpen: true
});
