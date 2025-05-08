import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function page() {
  return (
    <div className="px-4">
      <div className=" relative">
        <Input placeholder="Search..." />
        <SearchIcon className=" absolute size-4 left-2" />
      </div>
    </div>
  );
}
