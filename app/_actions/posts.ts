// import { getCurrentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getPosts(
  type: PostType,
  page: number,
  pageSize: number,
  targetUserId?: string,
) {
  //   const userId = await getCurrentUserId();
  const userId = "cmaocjf4k00001b0x89hhjowo";
  let whereClause = {};

  switch (type) {
    case "forYou":
      whereClause = {
        user: {
          following: { some: { followingId: userId } },
          blockers: { none: { blockerId: userId } },
          blocked: { none: { blockedId: userId } },
        },
        parentId: null,
        hides: { none: { userId } },
      };
      break;
    case "following":
      whereClause = {
        user: {
          followers: { some: { followerId: userId } },
          blockers: { none: { blockerId: userId } },
          blocked: { none: { blockedId: userId } },
        },
        parentId: null,
        hides: { none: { userId } },
      };
      break;
    case "user":
      whereClause = {
        user: {
          blockers: { none: { blockerId: userId } },
          blocked: { none: { blockedId: userId } },
        },
        userId: targetUserId || userId,
        parentId: null,
        hides: { none: { userId } },
      };
      break;
    case "liked":
      whereClause = {
        user: {
          blockers: { none: { blockerId: userId } },
          blocked: { none: { blockedId: userId } },
        },
        parentId: null,
        likes: { some: { userId } },
        hides: { none: { userId } },
      };
      break;
    case "saved":
      whereClause = {
        user: {
          blockers: { none: { blockerId: userId } },
          blocked: { none: { blockedId: userId } },
        },
        parentId: null,
        saves: { some: { userId } },
        hides: { none: { userId } },
      };
      break;
    case "replies":
      whereClause = {
        user: {
          blockers: { none: { blockerId: userId } },
          blocked: { none: { blockedId: userId } },
        },
        parentId: { not: null },
        hides: { none: { userId } },
      };
      break;
    default:
      throw new Error("Unknown post type");
  }

  return prisma.post.findMany({
    where: whereClause,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          followers: {
            where: { followerId: userId },
            select: { followerId: true },
          },
          following: {
            where: { followingId: userId },
            select: { followingId: true },
          },
          _count: { select: { followers: true, posts: true } },
        },
      },
      likes: { where: { userId }, select: { userId: true } },
      saves: { where: { userId }, select: { userId: true } },
      _count: { select: { likes: true, replies: true } },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });
}
