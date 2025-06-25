import { customAlphabet } from "nanoid";

export const nanoId = {
  id: () => customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 5)(),
  medId: () => customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 5)(),
  sectionId: () => customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 5)(),
  templateId: () => customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 5)(),
};
