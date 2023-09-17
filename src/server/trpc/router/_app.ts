import { router } from "../trpc";
import { authRouter } from "./auth";
import { blogRouter } from "./blog";

export const appRouter = router({
  auth: authRouter,
  blog: blogRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
