"use client";

import { PDFViewer, DocumentProps } from "@react-pdf/renderer";
import { JSXElementConstructor, ReactElement } from "react";

export default function ViewPdf({
  children,
}: {
  children:
    | ReactElement<DocumentProps, string | JSXElementConstructor<any>>
    | undefined;
}) {
  return (
    <PDFViewer className="h-screen w-full" showToolbar={true}>
      {children}
    </PDFViewer>
  );
}
