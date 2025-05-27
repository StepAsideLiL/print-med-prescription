import PrescriptionTemplate from "@/components/pdf-template/PrescriptionTemplate";

export default async function page({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  return (
    <main className="flex w-full items-start">
      <PrescriptionTemplate templateId={(await params).templateId} />
    </main>
  );
}
