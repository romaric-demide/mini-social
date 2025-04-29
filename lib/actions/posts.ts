import { PrismaClient } from "@prisma/client";
import { put, del } from "@vercel/blob";
import { z } from "zod";

const prisma = new PrismaClient();

const postSchema = z.object({
  text: z.string().min(1, "Le texte est requis"),
  postId: z.string().optional(),
  images: z.array(z.union([z.instanceof(File), z.string()])),
});

export async function upsertPost(formData: FormData) {
  const validation = postSchema.safeParse({
    text: formData.get("text"),
    postId: formData.get("postId"),
    images: formData.getAll("image"),
  });

  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors };
  }

  const { text, postId, images } = validation.data;

  const files = images.filter((img) => img instanceof File) as File[];
  const urls = images.filter((img) => typeof img === "string") as string[];

  if (postId) {
    const { images: existingImages } = await prisma.post.findUniqueOrThrow({
      where: { id: postId },
      select: { images: true },
    });

    const toDelete = existingImages.filter((img) => !urls.includes(img));
    await Promise.all(toDelete.map(del));
  }

  const uploadedUrls = await Promise.all(
    files.map((file) =>
      put(file.name, file, { access: "public", addRandomSuffix: true }).then(
        (res) => res.url,
      ),
    ),
  );

  const post = await prisma.post.upsert({
    where: { id: postId },
    update: { text, images: [...urls, ...uploadedUrls] },
    create: { text, images: uploadedUrls },
  });

  return { post };
}

export async function deletePost(postId: string) {
  const { images } = await prisma.post.findUniqueOrThrow({
    where: { id: postId },
    select: { images: true },
  });

  await Promise.all(images.map(del));
  await prisma.post.delete({ where: { id: postId } });
}
