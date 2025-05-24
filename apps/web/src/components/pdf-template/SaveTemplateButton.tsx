"use client";

import db from "@/lib/db";
import { store } from "@/lib/store";
import { Button } from "@workspace/design-system/ui/button";

export default function SaveTemplateButton() {
  const { get: headerSections } = store.HeaderSection();
  const { get: footerSections } = store.FooterSection();

  return (
    <Button
      variant={"outline"}
      className="cursor-pointer"
      onClick={() => {
        db.addTemplate(headerSections, footerSections);
      }}
    >
      Save Template
    </Button>
  );
}
