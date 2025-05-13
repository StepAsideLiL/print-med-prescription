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

const medListAtom = atom<TMedListSchema[]>([]);
function MedList() {
  const [get, set] = useAtom(medListAtom);
  return { get, set };
}

export const store = {
  CurrentPageSize,
  MedList,
};
