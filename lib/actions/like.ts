"use server";

import prisma from "../prisma";

export async function toggleLike(postId: string) {
  const userId = "cma1qsj4500007p0vnvw4huxk"; // À remplacer par session.user.id

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  } else {
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }
}
