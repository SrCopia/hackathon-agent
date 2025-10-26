import { D1ReadEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { OrderModel } from "./base";

export class OrderRead extends D1ReadEndpoint<HandleArgs> {
	_meta = {
		model: OrderModel,
	};
}
