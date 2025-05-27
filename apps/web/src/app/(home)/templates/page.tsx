import { Metadata } from "next";
import TemplateList from "./_client-components/TemplateList";
import Link from "next/link";
import { Button } from "@workspace/design-system/ui/button";

export const metadata: Metadata = {
  title: "Templates",
};

export default function page() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-5 py-5">
      <Button variant={"outline"} className="cursor-pointer" asChild>
        <Link href={"/create-template"}>Create New Template</Link>
      </Button>

      <TemplateList />
    </main>
  );
}
