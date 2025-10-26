import { Hono } from "hono";
import { fromHono } from "chanfana";
import { ProductList } from "./productList";
import { ProductCreate } from "./productCreate";
import { ProductRead } from "./productRead";
import { ProductUpdate } from "./productUpdate";
import { ProductDelete } from "./productDelete";

export const productRouter = fromHono(new Hono());

productRouter.get("/", ProductList);
productRouter.post("/", ProductCreate);
productRouter.get("/:id", ProductRead);
productRouter.put("/:id", ProductUpdate);
productRouter.delete("/:id", ProductDelete);
