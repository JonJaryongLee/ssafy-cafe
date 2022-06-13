import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		menus: [],
		loading: true,
	},
	mutations: {
		SET_MENUS(state, data) {
			state.menus = data;
		},
		SET_LOADING(state, data) {
			state.loading = data;
		},
	},
});
