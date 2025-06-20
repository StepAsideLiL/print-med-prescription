import * as PageSize from "./page-size";
import * as Medicine from "./med-list";
import { TMedListSchema } from "@/lib/types";
import { nanoId } from "@/lib/nanoid";
import * as Select from "./select";
import * as TemplateSection from "./template-section";
import * as PatientInfo from "./patient-info";

export function newMed(): TMedListSchema {
  return {
    id: nanoId.medId(),
    type: "tablet",
    medicineName: "",
    morning: true,
    noon: true,
    night: true,
    afterMeal: true,
    duration: {
      lenght: 7,
      unit: "day",
    },
  };
}

export const store = {
  ...PageSize,
  ...Medicine,
  ...Select,
  ...TemplateSection,
  ...PatientInfo,
};
