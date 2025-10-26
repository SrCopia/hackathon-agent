import { D1UpdateEndpoint, O } from "chanfana";
import { HandleArgs } from "../../types";
import { ProductModel } from "./base";
import { generateEmbedding, getOpenAIClient } from "../../lib/openai";

export class ProductUpdate extends D1UpdateEndpoint<HandleArgs> {
	_meta = {
		model: ProductModel,
		fields: ProductModel.schema.pick({
			name: true,
			description: true,
      price: true,
      stock: true,
			stockMinimum: true,
      category: true,
      image: true,
		}),
	};
	async after(updatedProduct: O<typeof this.meta>): Promise<O<typeof this.meta>> {
    try {
      const env = (this as any)?.args?.[0]?.env;
      const openaiClient = getOpenAIClient(env);

      if (openaiClient && updatedProduct.name && updatedProduct.description && updatedProduct.category) {
        const textToEmbed = `${updatedProduct.name} ${updatedProduct.description} ${updatedProduct.category}`;
        const embedding = await generateEmbedding(openaiClient, textToEmbed);

        const vector: VectorizeVector = {
          id: `product_${updatedProduct.id}`,
          values: embedding,
          metadata: {
            name: updatedProduct.name,
						category: updatedProduct.category,
            description: updatedProduct.description,
            type: "product",
          },
        };

        await env.VECTORIZE.upsert([vector]);
        console.log(
          `VECTORIZE upsert success for updated task: ${updatedProduct.id}`
        );
      }
    } catch (error) {
      console.error("Failed to update embedding:", error);
    }

    return updatedProduct;
  }
}

//para actualizar registro, si es que quiero cambiar algo del producto.
