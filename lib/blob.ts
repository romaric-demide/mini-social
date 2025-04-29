import { put, del } from "@vercel/blob";

export const syncFiles = async (files: File[], urls: string[]) => {
  await Promise.all(urls.map((url) => del(url)));
  return Promise.all(
    files.map((file) =>
      put(file.name, file, { access: "public", addRandomSuffix: true }).then((res) => res.url),
    ),
  );
};
