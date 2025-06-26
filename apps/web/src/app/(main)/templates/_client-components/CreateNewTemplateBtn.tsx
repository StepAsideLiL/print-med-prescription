"use client";

import { store } from "@/lib/store";
import { Button } from "@workspace/design-system/ui/button";
import Link from "next/link";

export default function CreateNewTemplateBtn() {
  const { set } = store.TemplateSection();

  return (
    <Button
      variant={"outline"}
      className="cursor-pointer"
      onClick={() =>
        set({
          header: [],
          footer: [],
        })
      }
      asChild
    >
      <Link href={"/create-template"}>Create New Template</Link>
    </Button>
  );
}
