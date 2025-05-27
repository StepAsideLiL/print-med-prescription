import Dexie, { EntityTable } from "dexie";
import { TTemplate, TTemplateSection } from "@/lib/types";
import { nanoId } from "@/lib/nanoid";

const localDB = new Dexie("pmp-template-v1") as Dexie & {
  template: EntityTable<TTemplate, "id">;
};

localDB.version(1).stores({
  template: "id",
});

export default {
  localDB,
  getTemplates: async () => {
    return await localDB.template.toArray();
  },
  createNewTemplate: async (template: TTemplateSection) => {
    await localDB.template.add({
      id: nanoId.templateId(),
      active: false,
      name: "New Template",
      template,
    });
  },
} as const;
