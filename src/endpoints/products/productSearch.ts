import { getOpenAIClient, generateEmbedding } from "../../lib/openai";
import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { HandleArgs } from "../../types";

export class ProductSearch extends OpenAPIRoute<HandleArgs> {
  schema = {
    tags: ["Products"],
    summary: "Search products using vector similarity",
    request: {
      query: z.object({
        q: z.string().min(1).describe("Search query text"),
        limit: z
          .number()
          .int()
          .min(1)
          .max(50)
          .default(10)
          .describe("Maximum number of results to return"),
        threshold: z
          .number()
          .min(0)
          .max(1)
          .default(0.6)
          .describe("Similarity threshold (0-1)"),
      }),
    },
    responses: {
      "200": {
        description: "Search results",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
              result: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  description: z.string(),
                  category: z.string(),
                  score: z.number(),
                  metadata: z.record(z.any()),
                })
              ),
              query: z.string(),
              total: z.number(),
            }),
          },
        },
      },
      "400": {
        description: "Bad request - missing query or invalid parameters",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
              error: z.string(),
            }),
          },
        },
      },
      "500": {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: z.object({
              success: z.boolean(),
              error: z.string(),
            }),
          },
        },
      },
    },
  };

  async handle(c: any) {
    try {
      const { query: queryParams } = await this.getValidatedData<
        typeof this.schema
      >();
      const { q: query, limit, threshold } = queryParams;
      const { env } = c;

      const openaiClient = getOpenAIClient(env);
      if (!openaiClient) {
        return Response.json(
          {
            success: false,
            error: "OpenAI API key not configured",
          },
          { status: 500 }
        );
      }

      if (!env?.VECTORIZE || typeof env.VECTORIZE.query !== "function") {
        return Response.json(
          {
            success: false,
            error: "Vectorize binding not configured",
          },
          { status: 500 }
        );
      }

      const queryEmbedding = await generateEmbedding(openaiClient, query);

      const matches = await env.VECTORIZE.query(queryEmbedding, {
        topK: limit,
        returnValues: false,
        returnMetadata: "all",
      });

      const filteredResults = matches.matches
        .filter((match: any) => match.score >= threshold)
        .map((match: any) => ({
          id: match.id,
          name: match.metadata?.name || "",
          description: match.metadata?.description || "",
          score: match.score,
          metadata: match.metadata || {},
        }));

      return Response.json({
        success: true,
        result: filteredResults,
        query,
        total: filteredResults.length,
        debug: {
          totalMatches: matches.matches.length,
          filteredCount: filteredResults.length,
          threshold,
          queryEmbeddingLength: queryEmbedding.length,
        },
      });
    } catch (error) {
      console.error("Vector search error:", error);
      return Response.json(
        {
          success: false,
          error: "Failed to perform vector search",
        },
        { status: 500 }
      );
    }
  }
}
