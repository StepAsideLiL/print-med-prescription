import { atom, useAtom } from "jotai";
import { TMedListSchema, TPageLebel } from "@/lib/types";
import { nanoId } from "../nanoid";

const currentPageSizeIdAtom = atom<TPageLebel>("a4");
function CurrentPageSize() {
  const [get, set] = useAtom(currentPageSizeIdAtom);
  return { get, set };
}

export function newMed(): TMedListSchema {
  return {
    id: nanoId.medId(),
    type: "tablet",
    medicineName: "",
    moring: true,
    noon: true,
    night: true,
    afterMeal: true,
    duration: {
      lenght: 7,
      unit: "day",
    },
  };
}

const medicineListAtom = atom<TMedListSchema[]>([]);
function MedicineList() {
  const [get, set] = useAtom(medicineListAtom);
  return { get, set };
}

export const store = {
  CurrentPageSize,
  MedicineList,
};
