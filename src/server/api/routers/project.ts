import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string(),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.userId; // correct, from Clerk's Auth

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const project = await ctx.db.project.create({
        data: {
          githubUrl: input.githubUrl,
          name: input.name,
          userToProjects: {
            create: {
              userId,
            },
          },
        },
      });

      return project;
    }),

  getProjects: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    return await ctx.db.project.findMany({
      where: {
        userToProjects: {
          some: { userId },
        },
        deletedAt: null,
      },
    });
  }),
});
