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
