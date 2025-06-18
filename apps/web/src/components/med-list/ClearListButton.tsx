"use client";

import db from "@/lib/db";
import { store } from "@/lib/store";
import { Button } from "@workspace/design-system/ui/button";

export default function ClearListButton() {
  const { set } = store.MedicineList();

  return (
    <Button
      variant={"outline"}
      className="cursor-pointer"
      onClick={async () => {
        set([]);
        await db.createMedList([]);
      }}
    >
      Clear List
    </Button>
  );
}
