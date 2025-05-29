"use client";

import { createPost, updatePost } from "@/app/_actions/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeftIcon, ImageUpIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  startTransition,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

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

    if (!text.trim()) return toast.error("Please write something!");

    const formData = new FormData();
    formData.append("text", text);

    images.forEach((img) =>
      formData.append("image", typeof img === "string" ? img : img.file),
    );

    startTransition(async () => {
      const res = post
        ? await updatePost(post.id, formData)
        : await createPost(formData);
      setText("");
      setImages([]);
      

      //   if (res.error) {
    //     toast.error(Object.values(res.error).flat()[0]);
    //     return;
    //   }

    
      toast.success(`Post ${post ? "updated" : "created"} successfully!`);
      redirect(`/profile/#${res.id}`);
    });
  };

  return (
    <>
      <div className="bg-background fixed inset-x-0 top-0 z-10 flex h-12 items-center">
        <Button variant={"ghost"} onClick={() => router.back()}>
          <ArrowLeftIcon className="size-5" />
        </Button>

        <div className=" text-lg font-semibold">
          {post ? "Edit Post" : "New Post"}
        </div>
      </div>

      <div className="mt-12 flex space-x-1.5 px-3">
        <div className="sticky top-12 flex max-h-[calc(100dvh-3rem)] flex-col items-center space-y-1.5 py-3">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Separator orientation="vertical" className="flex-1" />

          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() =>
              images.length < 4
                ? fileInputRef.current?.click()
                : toast.error("You can upload up to 4 images only!")
            }
          >
            <ImageUpIcon />
          </Button>
        </div>

        <div className="flex-1 space-y-1.5 py-3">
          <div className="font-medium text-base">@milton_code</div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              maxLength={500}
              className="resize-none"
            />

            {images.length < 4 && (
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            )}

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

            <Button className="ml-auto flex">POST</Button>
          </form>
        </div>
      </div>

      {/* 
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      */}

      {/* <div className="bg-background/50 top-0 z-10 flex h-12 items-center pl-2 backdrop-blur-3xl">
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
      </div> */}

      {/* <div className="mt-12 flex space-x-1 p-3.5">
        <div className="flex flex-col items-center justify-between">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="">
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
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-2.5">
          <div className="text-sm font-semibold">@devlisa</div>
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
            <div></div>
            <Button variant={"outline"}>POST</Button>
          </div>
        </form>
      </div> */}
    </>
  );
}
