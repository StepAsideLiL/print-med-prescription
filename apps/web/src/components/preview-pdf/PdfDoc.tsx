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
  /**
   * Recursively wrap plain text with mark components (bold, italic, link, …).
   */
  const renderMarks = (
    text: string,
    marks?: JSONContent["marks"]
  ): React.ReactNode => {
    if (!marks || marks.length === 0) return text;

    return marks.reduceRight<React.ReactNode>((inner, mark) => {
      switch (mark.type) {
        case "bold":
          return (
            <Text key={mark.type} style={{ fontWeight: "700" }}>
              {inner}
            </Text>
          );
        case "italic":
          return (
            <Text key={mark.type} style={{ fontStyle: "italic" }}>
              {inner}
            </Text>
          );
        case "underline":
          return (
            <Text key={mark.type} style={{ textDecoration: "underline" }}>
              {inner}
            </Text>
          );
        default:
          return <Text key={mark.type}>{inner}</Text>; // Unknown mark → render inner contents unchanged
      }
    }, text);
  };

  /**
   * Render an individual node according to its `type`.
   */
  const renderNode = (node: JSONContent, index: number): React.ReactNode => {
    const renderChildren = () =>
      node.content?.map((child, i) => renderNode(child, i));

    switch (node.type) {
      case "paragraph":
        return (
          <Text key={index} style={{ fontSize: 12 }}>
            {renderChildren()}
          </Text>
        );

      case "heading": {
        return (
          <Text key={index} style={{ fontSize: 18 }}>
            {renderChildren()}
          </Text>
        );
      }

      default:
        // Leaf node with plain text (apply marks), or unknown node type → recurse
        if (node.text) {
          return <Text key={index}>{renderMarks(node.text, node.marks)}</Text>;
        }
        // Fallback: render its children if we don’t explicitly handle the node type
        return renderChildren();
    }
  };

  /**
   * Handle both a single root node and an array of sibling nodes.
   */
  const renderContent = (content: JSONContent | JSONContent[]) =>
    Array.isArray(content)
      ? content.map((node, i) => renderNode(node, i))
      : renderNode(content, 0);

  // Using `prose` gives you nice defaults if you have the Tailwind Typography plugin installed.
  return <View style={{}}>{renderContent(content)}</View>;
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
