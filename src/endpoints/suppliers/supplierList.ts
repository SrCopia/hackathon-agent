import { D1ListEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { SupplierModel } from "./base";

export class SupplierList extends D1ListEndpoint<HandleArgs> {
	_meta = {
		model: SupplierModel,
	};

	searchFields = ["name", "rut", "phoneNumber", "email", "address"];
	defaultOrderBy = "id DESC";
}
