import { z } from "zod";

export const product = z.object({
	id: z.number().int(),
	name: z.string(),
  slug: z.string(),
	description: z.string(),
  price: z.number(),
  stock: z.number(),
  stockMinimum: z.number(),
  category: z.string(),
  image: z.string()
});

const slugify = (text: string): string => {
  return text
      .toLowerCase()
      .normalize("NFD") // elimina acentos
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-") // reemplaza todo lo que no sea alfanumérico por "-"
      .replace(/(^-|-$)+/g, ""); // elimina guiones al principio y al final
}; 

export const ProductModel = {
	tableName: "products",
	primaryKeys: ["id"],
	schema: product,
serializerObject: product,
};

