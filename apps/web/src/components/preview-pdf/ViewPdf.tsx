"use client";

import { PDFViewer } from "@react-pdf/renderer";
import PdfDoc from "./PdfDoc";
import db from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function ViewPdf() {
  let template = useLiveQuery(() => db.getActiveTemplate());
  const patientInfo = useLiveQuery(() => db.getPatientInfo());
  const medList = useLiveQuery(() => db.getMedList());

  if (patientInfo === undefined || patientInfo.length === 0) {
    return null;
  }

  if (medList === undefined) {
    return null;
  }

  if (template === undefined) {
    template = {
      id: "id",
      name: "name",
      active: true,
      template: {
        header: [
          {
            id: "h0loy",
            style: {
              width: "100%",
            },
            contentType: "text",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: {
                    textAlign: "left",
                    level: 1,
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Medicine Prescription",
                    },
                  ],
                },
              ],
            },
          },
        ],
        footer: [],
      },
    };
  }

  return (
    <PDFViewer className="h-screen w-full" showToolbar={true}>
      <PdfDoc medList={medList} template={template} patientInfo={patientInfo} />
    </PDFViewer>
  );
}
