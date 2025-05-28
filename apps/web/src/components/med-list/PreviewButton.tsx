"use client";

import db from "@/lib/db";
import { store } from "@/lib/store";
import { toast } from "@workspace/design-system/lib/toast";
import { Button } from "@workspace/design-system/ui/button";

export default function PreviewButton() {
  const { get } = store.MedicineList();

  return (
    <Button
      variant={"outline"}
      className="cursor-pointer"
      onClick={async () => {
        if (get.length === 0) {
          toast.error("No medicine added.");
          return;
        }

        await db.createMedList(get).then(() => {
          window.open("/preview", "_blank", "noopener,noreferrer");
        });
      }}
    >
      Preview PDF
    </Button>
  );
}
