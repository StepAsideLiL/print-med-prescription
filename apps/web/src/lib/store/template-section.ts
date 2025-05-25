import { atom, useAtom } from "jotai";
import { TTemplateSection, TTemplateSectionSchema } from "@/lib/types";
import { nanoId } from "@/lib/nanoid";

const templateSectionInitialContents = (
  col: string
): TTemplateSectionSchema => {
  if (col === "2") {
    return {
      id: nanoId.sectionId(),
      style: {
        width: "50%",
      },
      contentType: null,
      content: null,
    };
  }

  if (col === "3") {
    return {
      id: nanoId.sectionId(),
      style: {
        width: "33.33%",
      },
      contentType: null,
      content: null,
    };
  }

  return {
    id: nanoId.sectionId(),
    style: {
      width: "100%",
    },
    contentType: null,
    content: null,
  };
};

const templateSectionAtom = atom<TTemplateSection>({ header: [], footer: [] });
export function TemplateSection() {
  const [get, set] = useAtom(templateSectionAtom);
  return { get, set };
}

const createTemplateSectionAtom = atom(
  null,
  (
    get,
    set,
    options: {
      col: string;
      place: "header" | "footer";
    }
  ) => {
    set(templateSectionAtom, {
      ...get(templateSectionAtom),

      [options.place]: Array.from({
        length: parseInt(options.col),
      }).map(() => templateSectionInitialContents(options.col)),
    });
  }
);
export function CreateTemplateSection() {
  const [_, set] = useAtom(createTemplateSectionAtom);
  return { createTemplateSection: set };
}

const addSectionContentAtom = atom(
  null,
  (
    get,
    set,
    options: {
      place: "header" | "footer";
      contentType: TTemplateSectionSchema["contentType"];
      section: TTemplateSectionSchema;
    }
  ) => {
    set(templateSectionAtom, {
      ...get(templateSectionAtom),

      [options.place]: get(templateSectionAtom)[options.place].map((s) =>
        s.id === options.section.id
          ? {
              ...options.section,
              contentType: options.contentType,
              content: null,
            }
          : s
      ),
    });
  }
);
export function AddSectionContent() {
  const [_, set] = useAtom(addSectionContentAtom);
  return { addSectionContent: set };
}

const updateSectionContentAtom = atom(
  null,
  (
    get,
    set,
    options: {
      place: "header" | "footer";
      section: TTemplateSectionSchema;
    }
  ) => {
    set(templateSectionAtom, {
      ...get(templateSectionAtom),

      [options.place]: get(templateSectionAtom)[options.place].map((s) =>
        s.id === options.section.id ? options.section : s
      ),
    });
  }
);
export function UpdateSectionContent() {
  const [_, set] = useAtom(updateSectionContentAtom);
  return { updateSectionContent: set };
}

const removeSectionContentAtom = atom(
  null,
  (
    get,
    set,
    options: {
      place: "header" | "footer";
      section: TTemplateSectionSchema;
    }
  ) => {
    set(templateSectionAtom, {
      ...get(templateSectionAtom),

      [options.place]: get(templateSectionAtom)[options.place].map((s) =>
        s.id === options.section.id
          ? { ...options.section, contentType: null, content: null }
          : s
      ),
    });
  }
);
export function RemoveSectionContent() {
  const [_, set] = useAtom(removeSectionContentAtom);
  return { removeSectionContent: set };
}
