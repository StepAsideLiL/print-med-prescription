"use client";

import db from "@/lib/db";
import { store } from "@/lib/store";
import { Button } from "@workspace/design-system/ui/button";

export default function SaveTemplateButton() {
  const { get } = store.TemplateSection();

  return (
    <Button
      variant={"outline"}
      className="cursor-pointer"
      onClick={() => {
        db.addTemplate(get.header, get.footer);
      }}
    >
      Save Template
    </Button>
  );
}
