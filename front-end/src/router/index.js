import Vue from "vue";
import VueRouter from "vue-router";

import WelcomePageView from "../views/WelcomePageView.vue";
import OrderView from "../views/OrderView.vue";
import OrderChangeView from "../views/OrderChangeView.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "WelcomePageView",
		component: WelcomePageView,
	},
	{
		path: "/order",
		name: "OrderView",
		component: OrderView,
	},
	{
		path: "/order-change",
		name: "OrderChangeView",
		component: OrderChangeView,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
