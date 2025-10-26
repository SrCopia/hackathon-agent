import { z } from "zod";

export const order = z.object({
	id: z.number().int(),
	productId: z.number().int(),
	quantity: z.number().int(),
	price: z.number(),
	total: z.number(),
	date: z.string().datetime(),
});

export const OrderModel = {
	tableName: "orders",
	primaryKeys: ["id"],
	schema: order,
  serializer: (obj: Object) => {
    const o = obj as unknown as z.infer<typeof order>;
    return {
      ...o,
    };
  },
serializerObject: order,
};

