"use client";

import { store } from "@/lib/store";
import { Button } from "@workspace/design-system/ui/button";

export default function ClearListButton() {
  const { set } = store.MedicineList();

  return (
    <Button variant={"outline"} onClick={() => set([])}>
      Clear List
    </Button>
  );
}
