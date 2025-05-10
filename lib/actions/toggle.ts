"use server";

import { getCurrentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function toggleLike(postId: string) {
  const userId = await getCurrentUserId();
  const where = { userId_postId: { userId, postId } };
  const existing = await prisma.like.findUnique({ where });

  if (existing) {
    await prisma.like.delete({ where });
  } else {
    await prisma.like.create({ data: { userId, postId } });
  }
}

export async function toggleSave(postId: string) {
  const userId = await getCurrentUserId();
  const where = { userId_postId: { userId, postId } };
  const existing = await prisma.save.findUnique({ where });

  if (existing) {
    await prisma.save.delete({ where });
  } else {
    await prisma.save.create({ data: { userId, postId } });
  }
}

export async function toggleHide(postId: string) {
  const userId = await getCurrentUserId();
  const where = { userId_postId: { userId, postId } };
  const existing = await prisma.hide.findUnique({ where });

  if (existing) {
    await prisma.hide.delete({ where });
  } else {
    await prisma.hide.create({ data: { userId, postId } });
  }
}
