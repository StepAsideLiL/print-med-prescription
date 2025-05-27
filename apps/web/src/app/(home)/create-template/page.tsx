import PrescriptionTemplate from "@/components/pdf-template/PrescriptionTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Prescription Template",
};

export default function Page() {
  return (
    <main className="flex w-full items-start">
      <PrescriptionTemplate />
    </main>
  );
}
