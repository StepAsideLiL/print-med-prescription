"use client";

import db from "@/lib/db";
import { store } from "@/lib/store";
import { TTemplate } from "@/lib/types";
import { toast } from "@workspace/design-system/lib/toast";
import { Button } from "@workspace/design-system/ui/button";

export default function SaveTemplateButton({
  template,
}: {
  template: TTemplate | undefined;
}) {
  const { get } = store.TemplateSection();

  return (
    <Button
      variant={"outline"}
      className="cursor-pointer"
      onClick={() => {
        if (get.header.length === 0 && get.footer.length === 0) {
          toast.error("Template is empty.");
          return;
        }

        if (template === undefined) {
          db.createNewTemplate(get);
        }

        if (template !== undefined) {
          db.updateTemplate(template.id, get);
        }
      }}
    >
      Save Template
    </Button>
  );
}
