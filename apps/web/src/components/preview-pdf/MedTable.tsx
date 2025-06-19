"use client";

import { PDFViewerProps, Text, TextProps, View } from "@react-pdf/renderer";

function MedTableContiner({
  viewProps,
  children,
}: {
  viewProps?: PDFViewerProps;
  children?: React.ReactNode;
}) {
  return (
    <View style={{}} {...viewProps}>
      {children}
    </View>
  );
}

function MedTableHeaderRow({
  viewProps,
  children,
}: {
  viewProps?: PDFViewerProps;
  children?: React.ReactNode;
}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        color: "#555555",
      }}
      {...viewProps}
    >
      {children}
    </View>
  );
}

function MedTableHeaderRowCell({
  viewProps,
  textProps,
  children,
}: {
  viewProps?: PDFViewerProps;
  textProps?: TextProps;
  children?: React.ReactNode;
}) {
  return (
    <View
      style={{ width: "70px", padding: "4px", border: "1px solid black" }}
      {...viewProps}
    >
      <Text style={{ fontSize: "12px" }} {...textProps}>
        {children}
      </Text>
    </View>
  );
}

function MedTableRow({
  viewProps,
  children,
}: {
  viewProps?: PDFViewerProps;
  children?: React.ReactNode;
}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
      {...viewProps}
    >
      {children}
    </View>
  );
}

function MedTableCell({
  viewProps,
  textProps,
  children,
}: {
  viewProps?: PDFViewerProps;
  textProps?: TextProps;
  children?: React.ReactNode;
}) {
  return (
    <View
      style={{ width: "70px", padding: "4px", border: "1px solid black" }}
      {...viewProps}
    >
      <Text style={{ fontSize: "12px" }} {...textProps}>
        {children}
      </Text>
    </View>
  );
}

export default {
  MedTableContiner,
  MedTableHeaderRow,
  MedTableHeaderRowCell,
  MedTableRow,
  MedTableCell,
} as const;
