import { D1DeleteEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { AlertModel } from "./base";

export class AlertDelete extends D1DeleteEndpoint<HandleArgs> {
	_meta = {
		model: AlertModel,
	};
}
