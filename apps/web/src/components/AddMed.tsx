"use client";

import { newMed, store } from "@/lib/store";
import { Button } from "@workspace/design-system/ui/button";

export default function AddMed() {
  const { get, set } = store.MedList();

  return (
    <Button
      variant={"outline"}
      className="cursor-pointer"
      onClick={() => set([...get, newMed()])}
    >
      Add Med
    </Button>
  );
}
