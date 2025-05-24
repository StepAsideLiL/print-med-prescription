import { atom, useAtom } from "jotai";
import { THeaderSection } from "@/lib/types";
import { nanoId } from "@/lib/nanoid";

export const headerSection = (col: string): THeaderSection => {
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

const addHeaderTextAtom = atom(null, (get, set, section: THeaderSection) => {
  set(
    headerSectionAtom,
    get(headerSectionAtom).map((s) =>
      s.id === section.id
        ? {
            ...section,
            contentType: "text" as THeaderSection["contentType"],
            content: {
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Write...",
                    },
                  ],
                },
              ],
            },
          }
        : s
    )
  );
});
export function AddHeaderText() {
  const [_, set] = useAtom(addHeaderTextAtom);
  return { addHeaderText: set };
}

const addHeaderImageAtom = atom(null, (get, set, section: THeaderSection) => {
  set(
    headerSectionAtom,
    get(headerSectionAtom).map((s) =>
      s.id === section.id
        ? {
            ...section,
            contentType: "img" as THeaderSection["contentType"],
            content: null,
          }
        : s
    )
  );
});
export function AddHeaderImage() {
  const [_, set] = useAtom(addHeaderImageAtom);
  return { addHeaderImage: set };
}

const updateHeaderTextAtom = atom(null, (get, set, section: THeaderSection) => {
  set(
    headerSectionAtom,
    get(headerSectionAtom).map((s) =>
      s.id === section.id
        ? {
            ...section,
            content: section.content,
          }
        : s
    )
  );
});
export function UpdateHeaderText() {
  const [_, set] = useAtom(updateHeaderTextAtom);
  return { updateHeaderText: set };
}

const updateHeaderImageAtom = atom(
  null,
  (get, set, section: THeaderSection) => {
    set(
      headerSectionAtom,
      get(headerSectionAtom).map((s) =>
        s.id === section.id
          ? {
              ...section,
              content: section.content,
            }
          : s
      )
    );
  }
);
export function UpdateHeaderImage() {
  const [_, set] = useAtom(updateHeaderImageAtom);
  return { updateHeaderImage: set };
}

const removeHeaderSectionAtom = atom(
  null,
  (get, set, section: THeaderSection) => {
    set(
      headerSectionAtom,
      get(headerSectionAtom).map((s) =>
        s.id === section.id
          ? { ...section, contentType: null, content: null }
          : s
      )
    );
  }
);
export function RemoveHeaderSection() {
  const [_, set] = useAtom(removeHeaderSectionAtom);
  return { removeHeaderSection: set };
}
