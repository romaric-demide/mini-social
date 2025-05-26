"use server";

import prisma from "@/lib/prisma";

export async function toggleFollow(followingId: string) {
  const userId = "cmaocjf4k00001b0x89hhjowo";

  if (userId === followingId) {
    throw new Error("Cannot follow yourself");
  }

  const where = { followerId_followingId: { followerId: userId, followingId } };
  const existing = await prisma.follow.findUnique({ where });

  if (existing) {
    await prisma.follow.delete({ where });
  } else {
    await prisma.follow.create({ data: { followerId: userId, followingId } });
  }
}

export async function toggleBlock(blockedId: string) {
  const userId = "cmaocjf4k00001b0x89hhjowo";

  if (userId === blockedId) throw new Error("Cannot block yourself");

  const where = { blockerId_blockedId: { blockerId: userId, blockedId } };
  const existing = await prisma.block.findUnique({ where });

  if (existing) {
    await prisma.block.delete({ where });
  } else {
    await prisma.follow.deleteMany({
      where: {
        OR: [
          { followerId: userId, followingId: blockedId },
          { followerId: blockedId, followingId: userId },
        ],
      },
    });

    await prisma.block.create({ data: { blockerId: userId, blockedId } });
  }
}

export async function toggleLike(postId: string) {
  const userId = "cmaocjf4k00001b0x89hhjowo";
  const where = { userId_postId: { userId, postId } };
  const existing = await prisma.like.findUnique({ where });

  if (existing) {
    await prisma.like.delete({ where });
  } else {
    await prisma.like.create({ data: { userId, postId } });
  }
}

export async function toggleSave(postId: string) {
  const userId = "cmaocjf4k00001b0x89hhjowo";
  const where = { userId_postId: { userId, postId } };
  const existing = await prisma.save.findUnique({ where });

  if (existing) {
    await prisma.save.delete({ where });
  } else {
    await prisma.save.create({ data: { userId, postId } });
  }
}

export async function toggleHide(postId: string) {
  const userId = "cmaocjf4k00001b0x89hhjowo";
  const where = { userId_postId: { userId, postId } };
  const existing = await prisma.hide.findUnique({ where });

  if (existing) {
    await prisma.hide.delete({ where });
  } else {
    await prisma.hide.create({ data: { userId, postId } });
  }
}

type ActionType = "like" | "save" | "hide";

export async function toggleAction(action: ActionType, postId: string) {
  const userId = "cmaocjf4k00001b0x89hhjowo";
  const where = { userId_postId: { userId, postId } };

  if (action === "like") {
    const existing = await prisma.like.findUnique({ where });
    if (existing) {
      await prisma.like.delete({ where });
    } else {
      await prisma.like.create({ data: { userId, postId } });
    }
  } else if (action === "save") {
    const existing = await prisma.save.findUnique({ where });
    if (existing) {
      await prisma.save.delete({ where });
    } else {
      await prisma.save.create({ data: { userId, postId } });
    }
  } else if (action === "hide") {
    const existing = await prisma.hide.findUnique({ where });
    if (existing) {
      await prisma.hide.delete({ where });
    } else {
      await prisma.hide.create({ data: { userId, postId } });
    }
  } else {
    throw new Error(`Unknown action: ${action}`);
  }
}
