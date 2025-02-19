import { prisma } from "@/lib/prisma";
import { getBlogsRoute } from "../routes/blogRoutes";
import { RouteHandler } from "@hono/zod-openapi";

//controllers/getBlogs.ts
export const getBlogsHandler: RouteHandler<typeof getBlogsRoute> = async (
  c
) => {
  const blogs = await prisma.blog.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return c.json(blogs, 200);
};
