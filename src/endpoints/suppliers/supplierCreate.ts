import { D1CreateEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { SupplierModel } from "./base";

export class SupplierCreate extends D1CreateEndpoint<HandleArgs> {
	_meta = {
		model: SupplierModel,
		fields: SupplierModel.schema.pick({
			// this is purposely missing the id, because users shouldn't be able to define it
			name: true,
      rut: true,
			phoneNumber: true,
			email: true,
			address: true,
		}),
	};
}
