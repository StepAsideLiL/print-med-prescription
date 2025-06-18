import { date } from "@workspace/design-system/lib/date";
import { atom, useAtom } from "jotai";

type TPatientInfo = {
  name: string;
  age: number;
  date: string;
};

const patientInfoAtom = atom<TPatientInfo>({
  name: "",
  age: 0,
  date: date.today(date.getLocalTimeZone()).toString(),
});
export function PatientInfo() {
  const [get, set] = useAtom(patientInfoAtom);
  return { get, set };
}
