import { Hono } from "hono";
import { fromHono } from "chanfana";
import { SupplierList } from "./supplierList";
import { SupplierCreate } from "./supplierCreate";
import { SupplierRead } from "./supplierRead";
import { SupplierUpdate } from "./supplierUpdate";
import { SupplierDelete } from "./supplierDelete";

export const SupplierRouter = fromHono(new Hono());

SupplierRouter.get("/", SupplierList);
SupplierRouter.post("/", SupplierCreate);
SupplierRouter.get("/:id", SupplierRead);
SupplierRouter.put("/:id", SupplierUpdate);
SupplierRouter.delete("/:id", SupplierDelete);
