"use client";

import {
  TImageContent,
  TMedListSchema,
  TPatientInfo,
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
import MedTable from "./MedTable";

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
  patientInfo,
}: {
  medList: TMedListSchema[];
  template: TTemplate;
  patientInfo: TPatientInfo[];
}) {
  const patientName = patientInfo[0]?.name;
  const patientAge = patientInfo[0]?.age;
  const date = patientInfo[0]?.date.replaceAll("-", " / ");
  const durationUnitTitle = {
    day: "Day",
    week: "Week",
    month: "Month",
  };

  return (
    <Document pageLayout="twoColumnLeft">
      <Page size="A4" style={styles.page}>
        {template.template.header.length !== 0 && (
          <RenderTemplate template={template.template.header} place="header" />
        )}

        <View
          style={{
            border: "1px solid black",
            borderLeft: "none",
            borderRight: "none",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: "20px",
            fontSize: "12px",
            height: "20px",
          }}
        >
          <View>
            <Text>Name: {patientName}</Text>
          </View>
          <View>
            <Text>Age: {patientAge}</Text>
          </View>
          <View>
            <Text>Date: {date}</Text>
          </View>
        </View>

        <View style={{ flexGrow: 1, padding: "10px" }}>
          <MedTable.MedTableContiner
            viewProps={{ style: { padding: "10px 0" } }}
          >
            <MedTable.MedTableHeaderRow>
              <MedTable.MedTableHeaderRowCell>
                Med Type
              </MedTable.MedTableHeaderRowCell>

              <MedTable.MedTableHeaderRowCell>
                Med Name
              </MedTable.MedTableHeaderRowCell>

              <MedTable.MedTableHeaderRowCell>
                Day
              </MedTable.MedTableHeaderRowCell>

              <MedTable.MedTableHeaderRowCell>
                Noon
              </MedTable.MedTableHeaderRowCell>

              <MedTable.MedTableHeaderRowCell>
                Night
              </MedTable.MedTableHeaderRowCell>

              <MedTable.MedTableHeaderRowCell>
                Before / After Meal
              </MedTable.MedTableHeaderRowCell>

              <MedTable.MedTableHeaderRowCell>
                Duration
              </MedTable.MedTableHeaderRowCell>
            </MedTable.MedTableHeaderRow>
            {medList.map((med) => (
              <MedTable.MedTableRow key={med.id}>
                <MedTable.MedTableCell>
                  {med.type === "tablet" ? "Tablet" : "Syrup"}
                </MedTable.MedTableCell>

                <MedTable.MedTableCell>
                  {med.medicineName}
                </MedTable.MedTableCell>

                <MedTable.MedTableCell>
                  {med.morning ? "Yes" : "No"}
                </MedTable.MedTableCell>

                <MedTable.MedTableCell>
                  {med.noon ? "Yes" : "No"}
                </MedTable.MedTableCell>

                <MedTable.MedTableCell>
                  {med.night ? "Yes" : "No"}
                </MedTable.MedTableCell>

                <MedTable.MedTableCell>
                  {med.afterMeal ? "After" : "Before"}
                </MedTable.MedTableCell>

                <MedTable.MedTableCell>
                  {med.duration.lenght} {durationUnitTitle[med.duration.unit]}
                </MedTable.MedTableCell>
              </MedTable.MedTableRow>
            ))}
          </MedTable.MedTableContiner>
        </View>

        {template.template.footer.length !== 0 && (
          <RenderTemplate template={template.template.footer} place="footer" />
        )}
      </Page>
    </Document>
  );
}

function RenderTemplate({
  template,
  place,
}: {
  template: TTemplateSectionSchema[];
  place: "header" | "footer";
}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
        padding:
          place === "header" ? "20px 20px 10px 20px" : "10px 20px 20px 20px",
        borderTop: place === "footer" ? "1px solid black" : "none",
      }}
    >
      {template.map((template) => (
        <View
          key={template.id}
          style={{
            width: template.style.width,
            height: "100px",
          }}
        >
          {template.contentType === "text" && template.content !== null && (
            <RichTextRenderer content={template.content as JSONContent} />
          )}

          {template.contentType === "img" && template.content !== null && (
            <RenderImage content={template.content as TImageContent} />
          )}
        </View>
      ))}
    </View>
  );
}

function RichTextRenderer({ content }: { content: JSONContent }) {
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
            <Text
              key={mark.type}
              style={{
                fontWeight: "600",
              }}
            >
              {inner}
            </Text>
          );
        case "italic":
          return (
            <Text
              key={mark.type}
              style={{
                fontStyle: "italic",
              }}
            >
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
          return inner; // Unknown mark → render inner contents unchanged
      }
    }, text);
  };

  /**
   * Render an individual node according to its `type`.
   */
  const renderNode = (node: JSONContent, index: number): React.ReactNode => {
    const renderChildren = () => {
      return node.content?.map((child, i) => renderNode(child, i));
    };

    switch (node.type) {
      case "paragraph":
        return (
          <Text
            key={index}
            style={{
              fontSize: "12px",
              textAlign: node.attrs?.textAlign ? node.attrs.textAlign : "left",
            }}
          >
            {renderChildren()}
          </Text>
        );

      case "heading": {
        return (
          <Text
            key={index}
            style={{
              textAlign: node.attrs?.textAlign ? node.attrs.textAlign : "left",
              fontWeight: "normal",
              fontSize: "20px",
            }}
          >
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

  return <View style={{ height: "100px" }}>{renderContent(content)}</View>;
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
        display: "flex",
        flexDirection: "row",
        justifyContent:
          !content.style?.align || content.style.align === "left"
            ? "flex-start"
            : content?.style?.align === "center"
              ? "center"
              : "flex-end",
      }}
    >
      <View
        style={{
          width: "100px",
          height: "100px",
          overflow: "hidden",
          borderRadius: "1000",
        }}
      >
        <Image
          src={content.buffer}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </View>
    </View>
  );
}
