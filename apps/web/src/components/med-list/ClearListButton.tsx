"use client";

import db from "@/lib/db";
import { store } from "@/lib/store";
import { date } from "@workspace/design-system/lib/date";
import { Button } from "@workspace/design-system/ui/button";

export default function ClearListButton() {
  const { set } = store.MedicineList();
  const { set: setPatientInfo } = store.PatientInfo();

  return (
    <Button
      variant={"outline"}
      className="cursor-pointer"
      onClick={async () => {
        set([]);
        setPatientInfo({
          name: "",
          age: 0,
          date: date.today(date.getLocalTimeZone()).toString(),
        });
        await db.createMedList([]);
        await db.createPatientInfo({
          name: "",
          age: 0,
          date: date.today(date.getLocalTimeZone()).toString(),
        });
      }}
    >
      Clear List
    </Button>
  );
}
