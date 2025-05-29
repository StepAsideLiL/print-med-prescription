"use client";

import {
  TImageContent,
  TMedListSchema,
  TTemplate,
  TTemplateSectionSchema,
} from "@/lib/types";
import { JSONContent } from "@workspace/editor";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

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
  return (
    <Document pageLayout="twoColumnLeft">
      <Page size="A4" style={styles.page}>
        {template.template.header.length !== 0 && (
          <Header headerTemplate={template.template.header} />
        )}

        <View style={styles.section}>
          {medList.map((med) => (
            <View key={med.id}>
              <Text style={styles.medText}>{med.medicineName}</Text>
            </View>
          ))}
        </View>

        {template.template.footer.length !== 0 && (
          <Footer footerTemplate={template.template.footer} />
        )}
      </Page>
    </Document>
  );
}

function Header({
  headerTemplate,
}: {
  headerTemplate: TTemplateSectionSchema[];
}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
      }}
    >
      {headerTemplate.map((template) => (
        <View
          key={template.id}
          style={{
            width: template.style.width,
            height: "100px",
            border: "1px solid black",
          }}
        >
          {template.contentType === "text" && template.content !== null && (
            <RenderText content={template.content as JSONContent} />
          )}

          {template.contentType === "img" && template.content !== null && (
            <RenderImage content={template.content as TImageContent} />
          )}
        </View>
      ))}
    </View>
  );
}

function Footer({
  footerTemplate,
}: {
  footerTemplate: TTemplateSectionSchema[];
}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
      }}
    >
      {footerTemplate.map((template) => (
        <View
          key={template.id}
          style={{
            width: template.style.width,
            height: "100px",
            border: "1px solid black",
          }}
        >
          {template.contentType === "text" && template.content !== null && (
            <RenderText content={template.content as JSONContent} />
          )}

          {template.contentType === "img" && template.content !== null && (
            <RenderImage content={template.content as TImageContent} />
          )}
        </View>
      ))}
    </View>
  );
}

function RenderText({ content }: { content: JSONContent }) {
  return (
    <View>
      <Text>{JSON.stringify(content)}</Text>
    </View>
  );
}

function RenderImage({ content }: { content: TImageContent }) {
  if (content === null) {
    return (
      <View
        style={{
          width: "100px",
          height: "100px",
          overflow: "hidden",
          marginHorizontal: "auto",
          borderRadius: "1000",
        }}
      >
        <Image
          src={"https://placehold.co/100x100"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        width: "100px",
        height: "100px",
        overflow: "hidden",
        marginHorizontal: "auto",
        borderRadius: "1000",
      }}
    >
      <Image
        src={content.buffer}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </View>
  );
}
