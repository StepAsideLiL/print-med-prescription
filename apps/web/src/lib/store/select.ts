import { atom, useAtom } from "jotai";

const selectSectionAtom = atom<string | null>(null);
export function SelectSection() {
  const [get, set] = useAtom(selectSectionAtom);
  return { get, set };
}
