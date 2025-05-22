import { atom, useAtom } from "jotai";
import { TFooterSection } from "@/lib/types";
import { nanoId } from "@/lib/nanoid";

export const footerSection = (col: string): TFooterSection => {
  if (col === "2") {
    return {
      id: nanoId.footerSectionId(),
      style: {
        width: "50%",
      },
      contentType: null,
      content: null,
    };
  }

  if (col === "3") {
    return {
      id: nanoId.footerSectionId(),
      style: {
        width: "33.33%",
      },
      contentType: null,
      content: null,
    };
  }

  return {
    id: nanoId.footerSectionId(),
    style: {
      width: "100%",
    },
    contentType: null,
    content: null,
  };
};

const footerSectionAtom = atom<TFooterSection[]>([]);
export function FooterSection() {
  const [get, set] = useAtom(footerSectionAtom);
  return { get, set };
}

const selectFooterSectionAtom = atom<string | null>(null);
export function SelectFooterSection() {
  const [get, set] = useAtom(selectFooterSectionAtom);
  return { get, set };
}

const addFooterTextAtom = atom(null, (get, set, section: TFooterSection) => {
  set(
    footerSectionAtom,
    get(footerSectionAtom).map((s) =>
      s.id === section.id
        ? {
            ...section,
            contentType: "text" as TFooterSection["contentType"],
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
export function AddFooterText() {
  const [_, set] = useAtom(addFooterTextAtom);
  return { addFooterText: set };
}

const addFooterImageAtom = atom(null, (get, set, section: TFooterSection) => {
  set(
    footerSectionAtom,
    get(footerSectionAtom).map((s) =>
      s.id === section.id
        ? {
            ...section,
            contentType: "img" as TFooterSection["contentType"],
            content: {
              type: "doc",
              content: [
                {
                  type: "image",
                  attrs: {
                    src: "https://placehold.co/100x100",
                    alt: null,
                    title: null,
                  },
                },
              ],
            },
          }
        : s
    )
  );
});
export function AddFooterImage() {
  const [_, set] = useAtom(addFooterImageAtom);
  return { addFooterImage: set };
}

const updateFooterTextAtom = atom(null, (get, set, section: TFooterSection) => {
  set(
    footerSectionAtom,
    get(footerSectionAtom).map((s) =>
      s.id === section.id
        ? {
            ...section,
            content: section.content,
          }
        : s
    )
  );
});
export function UpdateFooterText() {
  const [_, set] = useAtom(updateFooterTextAtom);
  return { updateFooterText: set };
}

const updateFooterImageAtom = atom(
  null,
  (get, set, section: TFooterSection) => {
    set(
      footerSectionAtom,
      get(footerSectionAtom).map((s) =>
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
export function UpdateFooterImage() {
  const [_, set] = useAtom(updateFooterImageAtom);
  return { updateFooterImage: set };
}

const removeFooterSectionAtom = atom(
  null,
  (get, set, section: TFooterSection) => {
    set(
      footerSectionAtom,
      get(footerSectionAtom).map((s) =>
        s.id === section.id
          ? { ...section, contentType: null, content: null }
          : s
      )
    );
  }
);
export function RemoveFooterSection() {
  const [_, set] = useAtom(removeFooterSectionAtom);
  return { removeFooterSection: set };
}
