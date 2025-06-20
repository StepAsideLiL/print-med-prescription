"use client";

import db from "@/lib/db";
import { toast } from "@workspace/design-system/lib/toast";
import { Badge } from "@workspace/design-system/ui/badge";
import { Button } from "@workspace/design-system/ui/button";
import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TemplateList() {
  const templates = useLiveQuery(() => db.getTemplates());
  const route = useRouter();

  if (templates === undefined) {
    return (
      <div>
        <p className="text-muted-foreground text-center">Loading...</p>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div>
        <p className="text-muted-foreground text-center">No Templates</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {templates.map((template) => (
        <div key={template.id} className="space-y-2 border px-5 py-5">
          <div className="flex items-center gap-2">
            <h1 className="text-xl">{template.name}</h1>
            <Badge variant={template.active ? "success" : "outline"}>
              {template.active ? "Active" : "Inactive"}
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={async () => {
                await db
                  .toggleActiveTemplate(template.id)
                  .then(() => {
                    route.refresh();
                  })
                  .catch(() => {
                    toast.error("Failed to toggle template active status.");
                  });
              }}
            >
              {template.active ? "Deactivate" : "Activate"}
            </Button>
            <Button variant={"outline"} className="cursor-pointer" asChild>
              <Link href={`/edit-template/${template.id}`}>Edit Template</Link>
            </Button>
            <Button
              variant={"destructive"}
              className="active:bg-destructive/70 cursor-pointer"
              onClick={async () => {
                if (template.active === true) {
                  toast.error("Template is active, deactivate to delete.");
                  return;
                }

                await db
                  .deleteTemplate(template.id)
                  .then(() => {
                    toast.success("Template deleted successfully.");
                    route.refresh();
                  })
                  .catch(() => {
                    toast.error("Failed to delete template.");
                  });
              }}
            >
              Delete Template
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
