"use server";

// import { getCurrentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

// import { z } from "zod";

const userId = "cmaocjf4k00001b0x89hhjowo";

// const postSchema = z.object({
//   text: z.string().min(1, "Le texte est requis"),
//   images: z.array(z.union([z.instanceof(File), z.string()])),
// });

// export async function upsertPost(
//   formData: FormData,
//   postId?: string,
//   parentId?: string,
// ) {
//   const validation = postSchema.safeParse({
//     text: formData.get("text"),
//     images: formData.getAll("image"),
//   });

//   if (!validation.success) {
//     return { error: validation.error.flatten().fieldErrors };
//   }

//   const { text, images } = validation.data;
//   const files = images.filter((img) => img instanceof File);
//   const urls = images.filter((img) => typeof img === "string");

//   let newImageUrls: string[] = [];

//   if (postId) {
//     const existing = await prisma.post.findUniqueOrThrow({
//       where: {
//         id: postId,
//         images: { hasEvery: urls },
//         userId: "cma1qsj4500007p0vnvw4huxk",
//       },
//       select: { images: true },
//     });

//     const toDelete = existing.images.filter((url) => !urls.includes(url));
//     // newImageUrls = await syncFiles(files, toDelete);
//   } else {
//     // newImageUrls = await syncFiles(files, []);
//   }

//   const post = await prisma.post.upsert({
//     where: { id: postId || "" },
//     update: {
//       text,
//       images: [...urls, ...newImageUrls],
//     },
//     create: {
//       text,
//       images: newImageUrls,
//       userId: "cma1qsj4500007p0vnvw4huxk",
//       parentId,
//     },
//   });

//   return { post };
// }

export async function deletePost(id: string) {
  const { images } = await prisma.post.findUniqueOrThrow({
    where: { id },
    select: { images: true },
  });

  // await syncFiles([], images);
  await prisma.post.delete({ where: { id } });
}

export async function getPosts(
  type: PostType,
  page: number,
  pageSize: number,
  targetUserId?: string,
) {
  //   const userId = await getCurrentUserId();
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

export async function getPost(id: string) {
  return await prisma.post.findFirst({
    where: {
      id,
      user: {
        blockers: { none: { blockerId: userId } },
        blocked: { none: { blockedId: userId } },
      },
      parentId: null,
      hides: { none: { userId } },
    },
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
  });
}
