"use client";

import {
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
  startTransition,
} from "react";
import { ArrowLeftIcon, Camera, ImageUpIcon, X, XIcon } from "lucide-react";
// import { upsertPost } from "@/lib/actions/posts";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PostFormProps = {
  post?: {
    id: string;
    text: string;
    images: string[];
  };
};

type Image = {
  file: File;
  url: string;
};

export default function PostForm({ post }: PostFormProps) {
  const [text, setText] = useState(post?.text || "");
  const [images, setImages] = useState<(string | Image)[]>(post?.images || []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file?.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
      setImages((prev) => [...prev, { file, url: URL.createObjectURL(file) }]);
    }

    e.target.value = "";
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);

    images.forEach((img) =>
      formData.append("image", typeof img === "string" ? img : img.file),
    );

    startTransition(async () => {
    //   const res = await upsertPost(formData, post?.id);

    //   if (res.error) {
    //     toast.error(Object.values(res.error).flat()[0]);
    //     return;
    //   }

      toast.success(`Post ${post ? "updated" : "created"} successfully!`);
      setText("");
      setImages([]);
    });
  };

  return (
    <>
      <div className="bg-background/50 fixed inset-x-0 top-0 z-10 flex h-12 items-center pl-2 backdrop-blur-3xl">
        <Button
          variant={"ghost"}
          className="[&_svg:not([class*='size-'])]:size-5"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon />
        </Button>

        <div className="text-lg font-medium">
          {post ? "Edit Post" : "New Post"}
        </div>
      </div>

      <div className="mt-12 space-y-2.5 p-4">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>@ev_lisa</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            maxLength={500}
            className="resize-none"
          />

          {images.length > 0 && (
            <div className="flex aspect-square flex-wrap overflow-hidden rounded-lg">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="bg-accent relative aspect-square flex-1 basis-1/2 overflow-hidden rounded-lg border border-transparent"
                >
                  <Image
                    src={typeof img === "string" ? img : img.url}
                    alt="ffze"
                    fill
                    priority
                    className="object-cover"
                  />

                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => {
                      setImages((prev) => prev.filter((_, i) => i !== index));
                    }}
                    className="absolute top-2 right-2 size-6"
                  >
                    <XIcon />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <Button
                type="button"
                variant={"outline"}
                size={"icon"}
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageUpIcon />
              </Button>

              {images.length < 4 && (
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              )}
            </div>

            <Button variant={"outline"}>POST</Button>
          </div>
        </form>
      </div>
    </>
  );
}
