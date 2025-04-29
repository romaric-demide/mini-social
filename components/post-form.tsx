import {
    useRef,
    useState,
    ChangeEvent,
    FormEvent,
    startTransition,
  } from "react";
  import { Camera } from "lucide-react";
  import { upsertPost } from "@/lib/actions/posts"; // Assurez-vous que le chemin est correct
  
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
  
      images.forEach((img) => {
        formData.append("image", typeof img === "string" ? img : img.url);
      });
  
      if (post?.id) {
        formData.append("postId", post.id);
      }
  
      startTransition(async () => {
        await upsertPost(formData);
        setText("");
        setImages([]);
      });
    };
  
    return (
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg space-y-4 rounded-xl bg-white p-4 shadow"
      >
        <textarea
          className="w-full rounded border p-2"
          placeholder="Exprime-toi..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={500}
        />
  
        <div className="text-right text-sm text-gray-500">
          {text.length}/500 caractères
        </div>
  
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          <Camera size={18} />
          Ajouter une image
        </button>
  
        {images.length < 4 && (
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        )}
  
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={typeof img === "string" ? img : img.url}
                alt={`upload-${index}`}
                className="h-24 w-full rounded object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImages((prev) => prev.filter((_, i) => i !== index));
                }}
                className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-xs text-white hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
  
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Publier
        </button>
      </form>
    );
  }
  