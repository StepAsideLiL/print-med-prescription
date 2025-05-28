"use client";

import { TMedListSchema, TTemplate } from "@/lib/types";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  medText: {
    fontSize: 12,
  },
});

export default function PdfDoc({
  medList,
  template,
}: {
  medList: TMedListSchema[];
  template: TTemplate;
}) {
  console.log(template);

  return (
    <Document pageLayout="twoColumnLeft">
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {medList.map((med) => (
            <View key={med.id}>
              <Text style={styles.medText}>{med.medicineName}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
