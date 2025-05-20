import { CurrentPageSize } from "./page-size";
import { DeleteMedicine, MedicineList, UpdateMedicine } from "./med-list";
import { TMedListSchema } from "@/lib/types";
import { nanoId } from "@/lib/nanoid";
import { AddHeaderImage, AddHeaderText, HeaderSection } from "./header";

export function newMed(): TMedListSchema {
  return {
    id: nanoId.medId(),
    type: "tablet",
    medicineName: "",
    morning: true,
    noon: true,
    night: true,
    afterMeal: true,
    duration: {
      lenght: 7,
      unit: "day",
    },
  };
}

export const store = {
  CurrentPageSize,
  MedicineList,
  UpdateMedicine,
  DeleteMedicine,
  HeaderSection,
  AddHeaderText,
  AddHeaderImage,
};
