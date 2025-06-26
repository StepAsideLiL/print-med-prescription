"use client";

import db from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { JSONContent } from "@workspace/editor";
import { TImageContent } from "@/lib/types";
import React from "react";

export default function PreviewTemplate({
  place,
}: {
  place: "header" | "footer";
}) {
  const t = useLiveQuery(() => db.getActiveTemplate());

  if (t === undefined) {
    if (place === "header") {
      return (
        <div
          style={{
            padding:
              place === "header"
                ? "40px 40px 20px 40px"
                : "20px 40px 40px 40px",
          }}
        >
          <RichTextRenderer
            content={{
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
            }}
          />
        </div>
      );
    }

    return null;
  }

  const template = t.template[place];

  return (
    <div
      style={{
        padding:
          place === "header" ? "40px 40px 20px 40px" : "20px 40px 40px 40px",
      }}
    >
      <div className="flex items-center gap-1">
        {template.map((t, index) => (
          <div key={index} style={t.style} className="">
            {t.contentType === "text" && (
              <RichTextRenderer content={t.content as JSONContent} />
            )}

            {t.contentType === "img" && (
              <ImageRenderer content={t.content as TImageContent} />
            )}
          </div>
        ))}
      </div>
    </div>
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
            <span
              key={mark.type}
              style={{
                fontWeight: "600",
              }}
            >
              {inner}
            </span>
          );
        case "italic":
          return (
            <span
              key={mark.type}
              style={{
                fontStyle: "italic",
              }}
            >
              {inner}
            </span>
          );
        case "underline":
          return (
            <span key={mark.type} style={{ textDecoration: "underline" }}>
              {inner}
            </span>
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
          <p
            key={index}
            style={{
              fontSize: "12px",
              textAlign: node.attrs?.textAlign ? node.attrs.textAlign : "left",
            }}
          >
            {renderChildren()}
          </p>
        );

      case "heading": {
        return (
          <h1
            key={index}
            style={{
              textAlign: node.attrs?.textAlign ? node.attrs.textAlign : "left",
              fontWeight: "normal",
              fontSize: "20px",
            }}
          >
            {renderChildren()}
          </h1>
        );
      }

      default:
        // Leaf node with plain text (apply marks), or unknown node type → recurse
        if (node.text) {
          return (
            <React.Fragment key={index}>
              {renderMarks(node.text, node.marks)}
            </React.Fragment>
          );
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
  return <div className="min-h-28">{renderContent(content)}</div>;
}

function ImageRenderer({ content }: { content: TImageContent }) {
  if (!content) {
    return null;
  }

  const imageUrl = URL.createObjectURL(content.buffer);
  return (
    <div
      className="flex min-h-28"
      style={{
        justifyContent:
          !content?.style?.align || content.style.align === "left"
            ? "flex-start"
            : content?.style?.align === "center"
              ? "center"
              : "flex-end",
      }}
    >
      <div className="size-28 overflow-hidden rounded-full">
        <img src={imageUrl} className="h-full w-full object-contain" />
      </div>
    </div>
  );
}
