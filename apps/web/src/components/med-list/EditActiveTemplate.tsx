"use client";

import db from "@/lib/db";
import { Button } from "@workspace/design-system/ui/button";
import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";

export default function EditActiveTemplate() {
  const template = useLiveQuery(() => db.getActiveTemplate());

  if (template === undefined) {
    return (
      <Button variant={"outline"} className="cursor-pointer" asChild>
        <Link href={"/create-template"}>Create Template</Link>
      </Button>
    );
  }

  return (
    <Button variant={"outline"} className="cursor-pointer" asChild>
      <Link href={`/edit-template/${template.id}`}>Edit Template</Link>
    </Button>
  );
}
