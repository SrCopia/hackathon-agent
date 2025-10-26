import type { Context } from "hono";

export type AppContext = Context<{ Bindings: Env }>;
export type HandleArgs = [AppContext];
export interface EmbeddingResponse {
  shape: number[];
  data: number[][];
}
