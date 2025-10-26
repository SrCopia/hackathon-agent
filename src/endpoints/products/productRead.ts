import { D1ReadEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { ProductModel } from "./base";

export class ProductRead extends D1ReadEndpoint<HandleArgs> {
	_meta = {
		model: ProductModel,
	};
}
