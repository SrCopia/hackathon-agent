import { D1ListEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { OrderModel } from "./base";

export class OrderList extends D1ListEndpoint<HandleArgs> {
	_meta = {
		model: OrderModel,
	};

	searchFields = ["name", "rut", "phoneNumber", "email", "address"];
	defaultOrderBy = "id DESC";
}
