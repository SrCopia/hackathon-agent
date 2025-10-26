import { D1DeleteEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { ProductModel } from "./base";

export class ProductDelete extends D1DeleteEndpoint<HandleArgs> {
	_meta = {
		model: ProductModel,
	};
}
