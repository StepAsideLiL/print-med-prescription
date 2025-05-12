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
