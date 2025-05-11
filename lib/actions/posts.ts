"use server";
import { z } from "zod";
import prisma from "../prisma";
import { syncFiles } from "../blob";

const postSchema = z.object({
  text: z.string().min(1, "Le texte est requis"),
  images: z.array(z.union([z.instanceof(File), z.string()])),
});

export async function upsertPost(
  formData: FormData,
  postId?: string,
  parentId?: string,
) {
  const validation = postSchema.safeParse({
    text: formData.get("text"),
    images: formData.getAll("image"),
  });

  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors };
  }

  const { text, images } = validation.data;
  const files = images.filter((img) => img instanceof File);
  const urls = images.filter((img) => typeof img === "string");

  let newImageUrls: string[] = [];

  if (postId) {
    const existing = await prisma.post.findUniqueOrThrow({
      where: {
        id: postId,
        images: { hasEvery: urls },
        userId: "cma1qsj4500007p0vnvw4huxk",
      },
      select: { images: true },
    });

    const toDelete = existing.images.filter((url) => !urls.includes(url));
    newImageUrls = await syncFiles(files, toDelete);
  } else {
    newImageUrls = await syncFiles(files, []);
  }

  const post = await prisma.post.upsert({
    where: { id: postId || "" },
    update: {
      text,
      images: [...urls, ...newImageUrls],
    },
    create: {
      text,
      images: newImageUrls,
      userId: "cma1qsj4500007p0vnvw4huxk",
      parentId,
    },
  });

  return { post };
}

export async function deletePost(id: string) {
  const { images } = await prisma.post.findUniqueOrThrow({
    where: { id },
    select: { images: true },
  });

  await syncFiles([], images);
  await prisma.post.delete({ where: { id } });
}

export async function getPosts(type: string, page: number) {
  const PAGE_SIZE = 7;
  const offset = (page - 1) * PAGE_SIZE;

  const posts = await prisma.post.findMany({
    skip: offset,
    take: PAGE_SIZE,
    include: { user: true },
  });

  return posts;
}

import { getCurrentUserId } from "@/lib/auth";

export async function getForYouPosts(page: number, pageSize: number) {
  const userId = await getCurrentUserId();

  return prisma.post.findMany({
    where: {
      user: {
        following: { some: { followingId: userId } },
        blockers: { none: { blockerId: userId } },
        blocked: { none: { blockedId: userId } },
      },
      hides: { none: { userId } },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          _count: { select: { followers: true, posts: true } },
        },
      },
      _count: { select: { likes: true, replies: true } },
      likes: { where: { userId }, select: { userId: true } },
      saves: { where: { userId }, select: { userId: true } },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });
}

export async function getFollowingPosts(page: number, pageSize: number) {
  const userId = await getCurrentUserId();
  return prisma.post.findMany({
    where: {
      user: {
        followers: { some: { followerId: userId } },
        blockers: { none: { blockerId: userId } },
        blocked: { none: { blockedId: userId } },
      },
      hides: { none: { userId } },
      parentId: null,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          _count: { select: { followers: true, posts: true } },
        },
      },
      _count: { select: { likes: true, replies: true } },
      likes: { where: { userId }, select: { userId: true } },
      saves: { where: { userId }, select: { userId: true } },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });
}

export async function getLikedPosts(page: number, pageSize: number) {
  const userId = await getCurrentUserId();

  return prisma.post.findMany({
    where: {
      user: {
        blockers: { none: { blockerId: userId } },
        blocked: { none: { blockedId: userId } },
      },
      likes: { some: { userId } },
      hides: { none: { userId } },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          _count: { select: { followers: true, posts: true } },
        },
      },
      _count: { select: { likes: true, replies: true } },
      likes: { where: { userId }, select: { userId: true } },
      saves: { where: { userId }, select: { userId: true } },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });
}

export async function getSavedPosts(page: number, pageSize: number) {
  const userId = await getCurrentUserId();

  return prisma.post.findMany({
    where: {
      user: {
        blockers: { none: { blockerId: userId } },
        blocked: { none: { blockedId: userId } },
      },
      saves: { some: { userId } },
      hides: { none: { userId } },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          _count: { select: { followers: true, posts: true } },
        },
      },
      _count: { select: { likes: true, replies: true } },
      likes: { where: { userId }, select: { userId: true } },
      saves: { where: { userId }, select: { userId: true } },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserPosts(
  page: number,
  pageSize: number,
  targetUserId?: string,
) {
  const userId = await getCurrentUserId();

  return prisma.post.findMany({
    where: {
      userId: targetUserId || userId,
      hides: { none: { userId } },
      user: {
        blockers: { none: { blockerId: userId } },
        blocked: { none: { blockedId: userId } },
      },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          image: true,
          _count: { select: { followers: true, posts: true } },
        },
      },
      _count: { select: { likes: true, replies: true } },
      likes: { where: { userId }, select: { userId: true } },
      saves: { where: { userId }, select: { userId: true } },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });
}



export async function getReplyPosts(page: number, pageSize: number) { 
  const userId = await getCurrentUserId(); 
  
  return prisma.post.findMany({ 
    where: { 
      parentId: { not: null }, // Récupérer les posts qui ont un parentId (ce sont des réponses)
      hides: { none: { userId } }, // Exclure les posts masqués par l'utilisateur courant
    }, 
    include: { 
      user: { 
        select: { 
          id: true, 
          username: true, 
          image: true, 
          _count: { select: { followers: true, posts: true } }, 
        }, 
      }, 
      _count: { select: { likes: true, replies: true } }, 
      likes: { where: { userId }, select: { userId: true } }, 
      saves: { where: { userId }, select: { userId: true } }, 
    }, 
    skip: (page - 1) * pageSize, 
    take: pageSize, 
    orderBy: { createdAt: "desc" }, 
  }); 
}
