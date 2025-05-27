import { customAlphabet } from "nanoid";

export const nanoId = {
  medId: () => customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 5)(),
  sectionId: () => customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 5)(),
  templateId: () => customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 5)(),
};
