"use client";

import db from "@/lib/db";
import { nanoId } from "@/lib/nanoid";
import { store } from "@/lib/store";
import { TTemplate } from "@/lib/types";
import { toast } from "@workspace/design-system/lib/toast";
import { Button } from "@workspace/design-system/ui/button";
import { Input } from "@workspace/design-system/ui/input";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function SaveTemplateButton({
  template,
}: {
  template: TTemplate;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { get } = store.TemplateSection();
  const [templateName, setTemplateName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          if (templateName === "") {
            toast.error("Template name is empty.");
            return;
          }

          if (get.header.length === 0 && get.footer.length === 0) {
            toast.error("Template is empty.");
            return;
          }

          if (pathname === "/create-template") {
            const templateId = nanoId.templateId();
            await db
              .createNewTemplate(templateId, templateName, get)
              .then(() => {
                toast.success("Template created successfully.");
                router.push(`/edit-template/${templateId}`);
              })
              .catch(() => {
                toast.error("Template failed to create.");
                setLoading(false);
              });
          }

          if (pathname === `/edit-template/${template.id}`) {
            await db
              .updateTemplate(template.id, get)
              .then(() => {
                toast.success("Template updated successfully.");
                setLoading(false);
              })
              .catch(() => {
                toast.error("Template failed to update.");
                setLoading(false);
              });
          }
        }}
      >
        Save Template
      </Button>
    </div>
  );
}
