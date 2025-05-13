import AddMedicine from "@/components/AddMedicine";
import MedList from "@/components/MedList";
import PagePreview from "@/components/PagePreview";
import SelectPageSize from "@/components/SelectPageSize";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Print Med Prescription",
  description: "Print Med Prescription",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-2 px-5 py-5 md:px-0">
      <SelectPageSize />

      <PagePreview>
        <MedList />
        <AddMedicine />
      </PagePreview>
    </main>
  );
}
