import { D1ListEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import { AlertModel } from "./base";

export class AlertList extends D1ListEndpoint<HandleArgs> {
	_meta = {
		model: AlertModel,
	};

	searchFields = ["type", "severity", "status", "message", "assignedTo"];
	defaultOrderBy = "id DESC";
}
