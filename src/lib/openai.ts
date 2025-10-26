import { createOpenAI } from "@ai-sdk/openai";
import type { Env } from "../env";

export function getOpenAIClient(env: Env) {
  if (!env.OPENAI_API_KEY) {
    console.warn(
      "OPENAI_API_KEY is not set; OpenAI features will be disabled."
    );
    return null;
  }

  return createOpenAI({
    apiKey: env.OPENAI_API_KEY,
  });
}

export async function generateEmbedding(
  client: ReturnType<typeof createOpenAI>,
  text: string
): Promise<number[]> {
  const { embed } = await import("ai");

  const { embedding } = await embed({
    model: client.textEmbeddingModel("text-embedding-3-small"),
    value: text,
  });

  return embedding;
}