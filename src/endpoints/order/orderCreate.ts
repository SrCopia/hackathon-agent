import { D1CreateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { OrderModel } from "./base";

export class OrderCreate extends D1CreateEndpoint<HandleArgs> {
	_meta = {
		model: OrderModel,
		fields: OrderModel.schema.pick({
			// this is purposely missing the id, because users shouldn't be able to define it
			productId: true,
			quantity: true,
			price: true,
			total: true,
			date: true,
		}),
	};
}
