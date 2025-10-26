import { D1DeleteEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { OrderModel } from "./base";

export class OrderDelete extends D1DeleteEndpoint<HandleArgs> {
	_meta = {
		model: OrderModel,
	};
}
