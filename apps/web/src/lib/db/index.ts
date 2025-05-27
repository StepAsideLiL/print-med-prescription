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
  getTemplate: async (id: string) => {
    return await localDB.template.get(id);
  },
  createNewTemplate: async (
    templateName: string = "New Template",
    template: TTemplateSection
  ) => {
    await localDB.template.add({
      id: nanoId.templateId(),
      active: false,
      name: templateName,
      template,
    });
  },
  updateTemplate: async (templateId: string, template: TTemplateSection) => {
    await localDB.template.update(templateId, {
      template: template,
    });
  },
  deleteTemplate: async (id: string) => {
    const template = await localDB.template.get(id);
    if (template === undefined) {
      return;
    }
    if (template.active === true) {
      return;
    }
    await localDB.template.delete(id);
  },
  toggleActiveTemplate: async (id: string) => {
    const template = await localDB.template.toArray();

    await localDB.template.bulkUpdate(
      template.map((t) => ({
        key: t.id,
        changes: {
          active: t.id === id ? !t.active : false,
        },
      }))
    );
  },
} as const;
