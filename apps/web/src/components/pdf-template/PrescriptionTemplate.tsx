"use client";

import db from "@/lib/db";
import SaveTemplateButton from "./SaveTemplateButton";
import TemplateSection from "./TemplateSection";
import { TTemplate } from "@/lib/types";
import React from "react";
import { store } from "@/lib/store";

export default function PrescriptionTemplate({
  templateId,
}: {
  templateId?: string;
}) {
  const [template, setTemplate] = React.useState<TTemplate>({
    id: "",
    name: "",
    active: false,
    template: {
      header: [],
      footer: [],
    },
  });
  const { set } = store.TemplateSection();

  React.useEffect(() => {
    if (templateId) {
      db.getTemplate(templateId).then((t) => {
        if (t === undefined) {
          return;
        }
        setTemplate(t);
        set(t.template);
      });
    }
  }, [templateId]);

  return (
    <section className="mx-auto space-y-2 py-5">
      <div className="mx-auto w-full max-w-5xl">
        <SaveTemplateButton template={template} />
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
