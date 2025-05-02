"use server"

import prisma from "../prisma";


export async function toggleInteraction(type: "LIKE" | "SAVE" | "HIDE", postId: string) {
  const userId = "cma1qsj4500007p0vnvw4huxk"; // À remplacer par session.user.id

  const existingInteraction = await prisma.interaction.findUnique({
    where: {
      userId_postId_type: {
        userId,
        postId,
        type,
      },
    },
  });

  if (existingInteraction) {
    await prisma.interaction.delete({
      where: {
        userId_postId_type: {
          userId,
          postId,
          type,
        },
      },
    });
  } else {
    await prisma.interaction.create({
      data: {
        userId,
        postId,
        type,
      },
    });
  }
}
