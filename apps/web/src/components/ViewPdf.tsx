"use client";

import { PDFViewer } from "@react-pdf/renderer";
import PdfDoc from "./PdfDoc";
import { store } from "@/lib/store";
import { useEffect, useRef } from "react";

export default function ViewPdf() {
  const { get } = store.MedicineList();
  const workerRef = useRef<Worker>(null);

  useEffect(() => {
    console.log("Hello from useEffect!");

    workerRef.current = new window.Worker(
      /* webpackIgnore: true */ "/workers/db.worker.js",
      {
        type: "module",
      }
    );

    workerRef.current.postMessage("Hello from nextjs client component");
    workerRef.current.onmessage = (e) => {
      console.log(`${e.data} to nextjs client component`);
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  if (get.length === 0) {
    return null;
  }

  return (
    <PDFViewer className="h-screen w-full" showToolbar={true}>
      <PdfDoc medList={get} />
    </PDFViewer>
  );
}
