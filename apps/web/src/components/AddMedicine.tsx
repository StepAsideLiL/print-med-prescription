"use client";

import { newMed, store } from "@/lib/store";
import { Button } from "@workspace/design-system/ui/button";

export default function AddMedicine() {
  const { get, set } = store.MedicineList();

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
