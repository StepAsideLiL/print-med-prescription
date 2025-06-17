import AddMedicine from "@/components/med-list/AddMedicine";
import ClearListButton from "@/components/med-list/ClearListButton";
import PreviewButton from "@/components/med-list/PreviewButton";
import MedicineList from "@/components/med-list/MedicineList";
import PagePreview from "@/components/med-list/PagePreview";
import SelectPageSize from "@/components/med-list/SelectPageSize";
import { Metadata } from "next";

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
        <MedicineList />
        <AddMedicine />
      </PagePreview>
    </main>
  );
}
