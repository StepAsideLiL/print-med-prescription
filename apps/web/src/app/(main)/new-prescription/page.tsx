import AddMedicine from "@/components/AddMedicine";
import MedicineList from "@/components/MedicineList";
import PagePreview from "@/components/PagePreview";
import SelectPageSize from "@/components/SelectPageSize";
import { Button } from "@workspace/design-system/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New Prescription",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-2 px-5 py-5 md:px-0">
      <div className="flex items-center justify-between">
        <SelectPageSize />

        <Button variant={"outline"} asChild>
          <Link href={"/preview"} target="_blank">
            Preview
          </Link>
        </Button>
      </div>

      <PagePreview>
        <MedicineList />
        <AddMedicine />
      </PagePreview>
    </main>
  );
}
