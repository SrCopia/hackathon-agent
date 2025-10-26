import { D1CreateEndpoint, O } from "chanfana";
import { HandleArgs } from "../../types";
import { ProductModel } from "./base";
import { generateEmbedding, getOpenAIClient } from "../../lib/openai";

export class ProductCreate extends D1CreateEndpoint<HandleArgs> {
  _meta = {
    model: ProductModel,
    fields: ProductModel.schema.pick({
      name: true,
      description: true,
      price: true,
      stock: true,
      category: true,
      image: true,
    }),
  };

  async before(data: O<typeof this.meta>): Promise<O<typeof this.meta>> {
    try {
      const env = (this as any)?.args[0].env;
      const openaiClient = getOpenAIClient(env);
      if (!openaiClient) {
        return data;
      }

      const textToEmbed = `${data.name} ${data.description} ${data.category}`;
      const embedding = await generateEmbedding(openaiClient, textToEmbed);

      const vector: VectorizeVector = {
        id: `product_${data.slug}`,
        values: embedding,
        metadata: {
          name: data.name,
          description: data.description,
          slug: data.slug = data.name.toLowerCase().replace(/\s+/g, "-"),
          type: "product",
        },
      };

      await env.VECTORIZE.upsert([vector]);
    }
    catch(error) {
      console.error(error);
    }
    return Promise.resolve(data);
  }
}
