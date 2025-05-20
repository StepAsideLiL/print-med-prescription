import { atom, useAtom } from "jotai";
import { THeaderSection } from "@/lib/types";
import { nanoId } from "@/lib/nanoid";

export const headerSection = (col: string): THeaderSection => {
  if (col === "1") {
    return {
      id: nanoId.headerSectionId(),
      style: {
        width: "100%",
      },
      contentType: null,
      content: null,
    };
  }

  if (col === "2") {
    return {
      id: nanoId.headerSectionId(),
      style: {
        width: "50%",
      },
      contentType: null,
      content: null,
    };
  }

  if (col === "3") {
    return {
      id: nanoId.headerSectionId(),
      style: {
        width: "33.33%",
      },
      contentType: null,
      content: null,
    };
  }

  return {
    id: nanoId.headerSectionId(),
    style: {
      width: "100%",
    },
    contentType: null,
    content: null,
  };
};

const headerSectionAtom = atom<THeaderSection[]>([]);
export function HeaderSection() {
  const [get, set] = useAtom(headerSectionAtom);
  return { get, set };
}
