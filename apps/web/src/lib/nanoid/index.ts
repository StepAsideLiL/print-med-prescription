import { customAlphabet } from "nanoid";

export const nanoId = {
  medId: () => customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 5)(),
};
