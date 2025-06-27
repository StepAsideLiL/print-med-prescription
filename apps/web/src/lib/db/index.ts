import Dexie, { EntityTable } from "dexie";
import {
  TMedListSchema,
  TPatientInfo,
  TTemplate,
  TTemplateSection,
} from "@/lib/types";
import { nanoId } from "@/lib/nanoid";

const localDB = new Dexie("pmp-template-v1") as Dexie & {
  template: EntityTable<TTemplate, "id">;
  medList: EntityTable<TMedListSchema, "id">;
  patientInfo: EntityTable<TPatientInfo, "name">;
};

localDB.version(1).stores({
  template: "id",
  medList: "id",
  patientInfo: "name",
});

export default {
  localDB,
  getPatientInfo: async () => {
    return await localDB.patientInfo.toArray();
  },
  createPatientInfo: async (patientInfo: TPatientInfo) => {
    await localDB.patientInfo.clear();
    await localDB.patientInfo.add(patientInfo);
  },
  getMedList: async () => {
    return await localDB.medList.toArray();
  },
  createMedList: async (medList: TMedListSchema[]) => {
    await localDB.medList.clear();
    await localDB.medList.bulkAdd(medList);
  },
  getTemplates: async () => {
    return await localDB.template.toArray();
  },
  getTemplate: async (id: string) => {
    return await localDB.template.get(id);
  },
  getActiveTemplate: async () => {
    const templates = await localDB.template.toArray();
    return templates.find((t) => t.active === true);
  },
  createNewTemplate: async (
    templateId: string,
    templateName: string = "New Template",
    template: TTemplateSection
  ) => {
    await localDB.template.add({
      id: templateId,
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
