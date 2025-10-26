import { D1ReadEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { AlertModel } from "./base";

export class AlertRead extends D1ReadEndpoint<HandleArgs> {
	_meta = {
		model: AlertModel,
	};
}
