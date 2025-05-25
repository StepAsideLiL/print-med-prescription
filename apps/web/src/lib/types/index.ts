import { JSONContent } from "@workspace/editor";

export type TPageLebel =
  | "letter"
  | "tabloid"
  | "legal"
  | "statement"
  | "executive"
  | "folio"
  | "a3"
  | "a4"
  | "a5"
  | "b4"
  | "b5";

export type TPageSize = {
  id: TPageLebel;
  title: string;
  width: number;
  height: number;
};

export type TMedicineType = "tablet" | "syrup";

export type TMedicationDuration = {
  lenght: number;
  unit: "day" | "week" | "month";
};

export type TMedListSchema = {
  id: string;
  type: TMedicineType;
  medicineName: string;
  morning: boolean;
  noon: boolean;
  night: boolean;
  afterMeal: boolean;
  duration: TMedicationDuration;
};

export type TImageContent = {
  name: string;
  buffer: ArrayBuffer | Blob;
  mimeType: string;
};

export type TTemplateSectionSchema = {
  id: string;
  style: {
    width: string;
  };
  contentType: "text" | "img" | null;
  content: JSONContent | TImageContent | null;
};

export type TTemplateSection = {
  header: TTemplateSectionSchema[];
  footer: TTemplateSectionSchema[];
};
