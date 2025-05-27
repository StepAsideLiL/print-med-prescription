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
        if (get.header.length === 0 && get.footer.length === 0) {
          return;
        }

        db.createNewTemplate(get);
      }}
    >
      Save Template
    </Button>
  );
}
