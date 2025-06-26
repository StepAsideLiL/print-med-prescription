import { Metadata } from "next";
import TemplateList from "./_client-components/TemplateList";
import CreateNewTemplateBtn from "./_client-components/CreateNewTemplateBtn";

export const metadata: Metadata = {
  title: "Templates",
};

export default function page() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-5 py-5">
      <CreateNewTemplateBtn />

      <TemplateList />
    </main>
  );
}
