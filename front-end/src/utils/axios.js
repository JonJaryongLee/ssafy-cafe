import axios from "axios";

const DOMAIN = "http://localhost:8081/api";

const request = axios.create({
	baseURL: DOMAIN,
});

export const api = {
	getAllMenus: () => request.get("/all_menus"),
	getAllMenusName: () => request.get("/all_menus_name"),
	getMenu: (menu_id) => request.get(`/menu/${menu_id}`),
	getAllOrders: () => request.get("/all_orders"),
	getOrder: (order_id) => request.get(`/order/${order_id}`),
	postOrder: (menu_id, menu_quantity, menu_order_detail = undefined) =>
		request.post("/order/", {
			menu_id,
			menu_quantity,
			menu_order_detail,
		}),
	patchOrder: (
		order_id,
		menu_id,
		menu_quantity,
		menu_order_detail = undefined
	) =>
		request.patch("/order", {
			order_id,
			menu_id,
			menu_quantity,
			menu_order_detail,
		}),
	deleteOrder: (order_id) => {
		return request.delete("/order", { data: { order_id } });
	},
};
