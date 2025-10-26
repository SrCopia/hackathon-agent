import { D1UpdateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { OrderModel } from "./base";

export class OrderUpdate extends D1UpdateEndpoint<HandleArgs> {
	_meta = {
		model: OrderModel,
		fields: OrderModel.schema.pick({
			productId: true,
			quantity: true,
			price: true,
			total: true,
			date: true,
		}),
	};
}

//para actualizar registro, si es que quiero cambiar algo del producto.
