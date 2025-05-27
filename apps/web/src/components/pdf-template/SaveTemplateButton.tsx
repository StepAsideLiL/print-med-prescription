"use client";

import db from "@/lib/db";
import { store } from "@/lib/store";
import { TTemplate } from "@/lib/types";
import { toast } from "@workspace/design-system/lib/toast";
import { Button } from "@workspace/design-system/ui/button";
import { Input } from "@workspace/design-system/ui/input";
import { usePathname } from "next/navigation";
import React from "react";

export default function SaveTemplateButton({
  template,
}: {
  template: TTemplate;
}) {
  const pathname = usePathname();
  const { get } = store.TemplateSection();
  const [templateName, setTemplateName] = React.useState("");

  React.useEffect(() => {
    setTemplateName(template.name);
  }, [template.name]);

  return (
    <div className="justify-bewteen flex items-center gap-2">
      <Input
        type="text"
        placeholder="Template Name"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
      />

      <Button
        variant={"outline"}
        className="cursor-pointer"
        onClick={async () => {
          if (templateName === "") {
            toast.error("Template name is empty.");
            return;
          }

          if (get.header.length === 0 && get.footer.length === 0) {
            toast.error("Template is empty.");
            return;
          }

          if (pathname === "/create-template") {
            await db
              .createNewTemplate(templateName, get)
              .then(() => {
                toast.success("Template created successfully.");
              })
              .catch(() => {
                toast.error("Template failed to create.");
              });
          }

          if (pathname === `/edit-template/${template.id}`) {
            await db
              .updateTemplate(template.id, get)
              .then(() => {
                toast.success("Template updated successfully.");
              })
              .catch(() => {
                toast.error("Template failed to update.");
              });
          }
        }}
      >
        Save Template
      </Button>
    </div>
  );
}
