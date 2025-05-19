import { atom, useAtom } from "jotai";
import { TPageLebel } from "../types";

const currentPageSizeIdAtom = atom<TPageLebel>("a4");
export function CurrentPageSize() {
  const [get, set] = useAtom(currentPageSizeIdAtom);
  return { get, set };
}
