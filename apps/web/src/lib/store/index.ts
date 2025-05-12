import { atom, useAtom } from "jotai";
import { TPageLebel } from "@/lib/types";

const currentPageSizeIdAtom = atom<TPageLebel>("a4");
function CurrentPageSize() {
  const [get, set] = useAtom(currentPageSizeIdAtom);
  return { get, set };
}

export const store = {
  CurrentPageSize,
};
