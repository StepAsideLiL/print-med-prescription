import AddMedicine from "@/components/med-list/AddMedicine";
import ClearListButton from "@/components/med-list/ClearListButton";
import PreviewButton from "@/components/med-list/PreviewButton";
import MedicineList from "@/components/med-list/MedicineList";
import PagePreview from "@/components/med-list/PagePreview";
import SelectPageSize from "@/components/med-list/SelectPageSize";
import { Metadata } from "next";
import PreviewTemplate from "@/components/med-list/PreviewTemplate";
import PatientInfo from "@/components/med-list/PatientInfo";

export const metadata: Metadata = {
  title: "Write A New Prescription",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-2 px-5 py-5 md:px-0">
      <div className="flex items-center justify-between">
        <SelectPageSize />

        <div className="flex items-center gap-2">
          <ClearListButton />

          <PreviewButton />
        </div>
      </div>

      <PagePreview>
        <div className="flex h-full flex-col">
          <PreviewTemplate place="header" />

          <PatientInfo />

          <div className="flex-1">
            <MedicineList />
            <AddMedicine />
          </div>

          <PreviewTemplate place="footer" />
        </div>
      </PagePreview>
    </main>
  );
}
