import { atom, useAtom } from "jotai";
import { TMedicineType, TMedListSchema, TPageLebel } from "@/lib/types";
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

const medicineListAtom = atom<TMedListSchema[]>([]);
function MedicineList() {
  const [get, set] = useAtom(medicineListAtom);
  return { get, set };
}

const updateMedicineAtom = atom(
  null,
  (get, set, newMedicine: TMedListSchema) => {
    set(
      medicineListAtom,
      get(medicineListAtom).map((med) =>
        med.id === newMedicine.id ? newMedicine : med
      )
    );
  }
);
function UpdateMedicine() {
  const [_, set] = useAtom(updateMedicineAtom);
  return { update: set };
}

const deleteMedicineAtom = atom(null, (get, set, medicineId: string) => {
  set(
    medicineListAtom,
    get(medicineListAtom).filter((med) => med.id !== medicineId)
  );
});
function DeleteMedicine() {
  const [_, set] = useAtom(deleteMedicineAtom);
  return { delete: set };
}

export const store = {
  CurrentPageSize,
  MedicineList,
  UpdateMedicine,
  DeleteMedicine,
};
