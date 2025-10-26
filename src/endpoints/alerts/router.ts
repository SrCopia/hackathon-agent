import { Hono } from "hono";
import { fromHono } from "chanfana";
import { AlertList } from "./alertList";
import { AlertCreate } from "./alertCreate";
import { AlertRead } from "./alertRead";
import { AlertUpdate } from "./alertUpdate";
import { AlertDelete } from "./alertDelete";

export const AlertRouter = fromHono(new Hono());

AlertRouter.get("/", AlertList);
AlertRouter.post("/", AlertCreate);
AlertRouter.get("/:id", AlertRead);
AlertRouter.put("/:id", AlertUpdate);
AlertRouter.delete("/:id", AlertDelete);
