"use client";

import { PDFViewer } from "@react-pdf/renderer";
import PdfDoc from "./PdfDoc";
import { store } from "@/lib/store";
import db from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function ViewPdf() {
  const { get } = store.MedicineList();
  const template = useLiveQuery(() => db.getActiveTemplate());

  if (get.length === 0 || template === undefined) {
    return null;
  }

  return (
    <PDFViewer className="h-screen w-full" showToolbar={true}>
      <PdfDoc medList={get} template={template} />
    </PDFViewer>
  );
}
