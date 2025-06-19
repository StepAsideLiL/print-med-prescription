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

      <div className="bg-background w-[1000px]">
        <div className="flex flex-col">
          <div className="flex-none px-10 pt-10 pb-5">
            <TemplateSection place="header" />
          </div>

          <div className="border-foreground/50 text-muted-foreground border-y text-center">
            <h1 className="tracking-[10px]">Patient Information</h1>
          </div>

          <div className="text-muted-foreground grow py-15 text-center">
            <h1 className="tracking-[18px]">Medicine List</h1>
          </div>

          <div className="border-foreground/50 flex-none border-t px-10 pt-5 pb-10">
            <TemplateSection place="footer" />
          </div>
        </div>
      </div>
    </section>
  );
}
