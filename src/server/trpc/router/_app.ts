import { router } from "../trpc";
import { authRouter } from "./auth";
import { blogRouter } from "./blog";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  blog: blogRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
