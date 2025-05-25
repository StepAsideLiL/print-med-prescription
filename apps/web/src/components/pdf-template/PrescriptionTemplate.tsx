"use client";

import SaveTemplateButton from "./SaveTemplateButton";
import TemplateSection from "./TemplateSection";

export default function PrescriptionTemplate() {
  return (
    <section className="mx-auto space-y-2 py-5">
      <div className="mx-auto w-full max-w-5xl">
        <SaveTemplateButton />
      </div>

      <div className="bg-background h-[1360px] w-[1000px]">
        <div className="flex h-full flex-col">
          <div className="flex-none px-10 pb-5 pt-10">
            <TemplateSection place="header" />
          </div>

          <div className="border-foreground/50 border-y">Name</div>

          <div className="grow">Body</div>

          <div className="border-foreground/50 flex-none border-t px-10 pb-10 pt-5">
            <TemplateSection place="footer" />
          </div>
        </div>
      </div>
    </section>
  );
}
