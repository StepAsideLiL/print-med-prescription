import Main from "@/components/pdf-template/Main";
import PrescriptionTemplate from "@/components/pdf-template/PrescriptionTemplate";

export default async function page({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  return (
    <Main className="flex w-full items-start">
      <PrescriptionTemplate templateId={(await params).templateId} />
    </Main>
  );
}
