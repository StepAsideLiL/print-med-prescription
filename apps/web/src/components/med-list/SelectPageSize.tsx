"use client";

import { pageSizes } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/design-system/ui/select";
import { Label } from "@workspace/design-system/ui/label";
import { store } from "@/lib/store";
import { TPageLebel } from "@/lib/types";

export default function SelectPageSize() {
  const { get, set } = store.CurrentPageSize();

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="page-size" className="text-base">
        Page Size
      </Label>

      <Select value={get} onValueChange={(value: TPageLebel) => set(value)}>
        <SelectTrigger id="page-size" className="w-32 cursor-pointer">
          <SelectValue placeholder="Select page size" />
        </SelectTrigger>

        <SelectContent>
          {pageSizes.map((item) => (
            <SelectItem
              key={item.id}
              className="cursor-pointer"
              value={item.id}
            >
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
