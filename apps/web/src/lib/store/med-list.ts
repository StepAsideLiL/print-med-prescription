import { atom, useAtom } from "jotai";
import { TMedListSchema } from "@/lib/types";

const medicineListAtom = atom<TMedListSchema[]>([]);
export function MedicineList() {
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
export function UpdateMedicine() {
  const [_, set] = useAtom(updateMedicineAtom);
  return { update: set };
}

const deleteMedicineAtom = atom(null, (get, set, medicineId: string) => {
  set(
    medicineListAtom,
    get(medicineListAtom).filter((med) => med.id !== medicineId)
  );
});
export function DeleteMedicine() {
  const [_, set] = useAtom(deleteMedicineAtom);
  return { delete: set };
}
