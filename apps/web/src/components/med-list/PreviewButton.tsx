"use client";

import db from "@/lib/db";
import { store } from "@/lib/store";
import { toast } from "@workspace/design-system/lib/toast";
import { Button } from "@workspace/design-system/ui/button";

export default function PreviewButton() {
  const { get: medicineList } = store.MedicineList();
  const { get: patientInfo } = store.PatientInfo();

  return (
    <Button
      variant={"outline"}
      className="cursor-pointer"
      onClick={async () => {
        if (patientInfo.name === "") {
          toast.error("Patient name is required.");
          return;
        }

        if (medicineList.length === 0) {
          toast.error("No medicine added.");
          return;
        }

        await Promise.all([
          await db.createMedList(medicineList),
          await db.createPatientInfo(patientInfo),
        ]).then(() => {
          window.open("/preview", "_blank", "noopener,noreferrer");
        });
      }}
    >
      Preview PDF
    </Button>
  );
}
