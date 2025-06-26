import Main from "@/components/pdf-template/Main";
import PrescriptionTemplate from "@/components/pdf-template/PrescriptionTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Prescription Template",
};

export default function Page() {
  return (
    <Main className="flex w-full items-start">
      <PrescriptionTemplate />
    </Main>
  );
}
