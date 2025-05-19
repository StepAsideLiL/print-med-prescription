export default function PrescriptionTemplate() {
  return (
    <section className="mx-auto py-5">
      <div className="bg-background h-[1360px] w-[1000px]">
        <div className="flex h-full flex-col">
          <div className="flex-none px-10 pb-5 pt-10">Header</div>

          <div className="border-foreground/50 border-y">Name</div>

          <div className="grow">Body</div>

          <div className="border-foreground/50 flex-none border-t px-10 pb-10 pt-5">
            Footer
          </div>
        </div>
      </div>
    </section>
  );
}
