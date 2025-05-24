import Dexie, { EntityTable } from "dexie";
import { TFooterSection, THeaderSection } from "@/lib/types";

const localDB = new Dexie("pmp-template-v1") as Dexie & {
  headerTemplate: EntityTable<THeaderSection, "id">;
  footerTemplate: EntityTable<TFooterSection, "id">;
};

localDB.version(1).stores({
  headerTemplate: "id",
  footerTemplate: "id",
});

export default {
  addTemplate: async (ht: THeaderSection[], ft: TFooterSection[]) => {
    await localDB.headerTemplate.bulkAdd(ht);
    await localDB.footerTemplate.bulkAdd(ft);
  },
} as const;
