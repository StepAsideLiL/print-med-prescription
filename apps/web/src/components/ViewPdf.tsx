"use client";

import { PDFViewer } from "@react-pdf/renderer";
import PdfDoc from "./PdfDoc";
import { store } from "@/lib/store";

export default function ViewPdf() {
  const { get } = store.MedicineList();

  if (get.length === 0) {
    return null;
  }

  return (
    <PDFViewer className="h-screen w-full" showToolbar={true}>
      <PdfDoc medList={get} />
    </PDFViewer>
  );
}
