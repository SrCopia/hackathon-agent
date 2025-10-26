import { Hono } from "hono";
import { fromHono } from "chanfana";
import { ProductList } from "./productList";
import { ProductCreate } from "./productCreate";
import { ProductRead } from "./productRead";
import { ProductUpdate } from "./productUpdate";
import { ProductDelete } from "./productDelete";
import { ProductSearch } from "./productSearch";

export const productRouter = fromHono(new Hono());

productRouter.get("/", ProductList);
productRouter.get("/search", ProductSearch);
productRouter.post("/", ProductCreate);
productRouter.get("/:id", ProductRead);
productRouter.put("/:id", ProductUpdate);
productRouter.delete("/:id", ProductDelete);
