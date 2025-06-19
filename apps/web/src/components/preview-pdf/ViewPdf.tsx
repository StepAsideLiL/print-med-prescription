"use client";

import { PDFViewer } from "@react-pdf/renderer";
import PdfDoc from "./PdfDoc";
import db from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function ViewPdf() {
  const template = useLiveQuery(() => db.getActiveTemplate());
  const patientInfo = useLiveQuery(() => db.getPatientInfo());
  const medList = useLiveQuery(() => db.getMedList());

  console.log(patientInfo);

  if (patientInfo === undefined || patientInfo.length === 0) {
    return null;
  }

  if (medList === undefined) {
    return null;
  }

  if (template === undefined) {
    return null;
  }

  return (
    <PDFViewer className="h-screen w-full" showToolbar={true}>
      <PdfDoc medList={medList} template={template} patientInfo={patientInfo} />
    </PDFViewer>
  );
}
