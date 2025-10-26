import { Hono } from "hono";
import { fromHono } from "chanfana";
import { OrderList } from "./orderList";
import { OrderCreate } from "./orderCreate";
import { OrderRead } from "./orderRead";
import { OrderUpdate } from "./orderUpdate";
import { OrderDelete } from "./orderDelete";

export const OrderRouter = fromHono(new Hono());

OrderRouter.get("/", OrderList);
OrderRouter.post("/", OrderCreate);
OrderRouter.get("/:id", OrderRead);
OrderRouter.put("/:id", OrderUpdate);
OrderRouter.delete("/:id", OrderDelete);
