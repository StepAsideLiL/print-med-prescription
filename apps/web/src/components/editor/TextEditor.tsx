"use client";

import { store } from "@/lib/store";
import { THeaderSection } from "@/lib/types";
import Icons from "@workspace/design-system/icons";
import { cn } from "@workspace/design-system/lib/utils";
import { Button } from "@workspace/design-system/ui/button";
import {
  Bold,
  Color,
  Document,
  EditorContent,
  Heading,
  Italic,
  Paragraph,
  Text,
  TextStyle,
  Underline,
  useEditor,
} from "@workspace/editor";
import React from "react";

export default function TextEditor({ section }: { section: THeaderSection }) {
  const { updateHeaderText } = store.UpdateHeaderText();
  const { get, set } = store.SelectSection();

  const editor = useEditor({
    extensions: [
      Document.Document,
      Text.Text,
      Heading.Heading.configure({
        levels: [1],
        HTMLAttributes: {
          class: "text-xl",
        },
      }),
      Paragraph.Paragraph,
      Bold.Bold.configure({
        HTMLAttributes: {
          class: "font-semibold",
        },
      }),
      Italic.Italic.configure({
        HTMLAttributes: {
          class: "italic",
        },
      }),
      Underline.Underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
      Color.Color,
      TextStyle.TextStyle,
    ],
    content: section.content,
    editorProps: {
      attributes: {
        class: "min-h-28 p-1 border-none focus-visible:outline-none",
      },
    },
  });

  if (editor === null) {
    return null;
  }

  return (
    <div
      style={section.style}
      className={cn(
        "relative border",
        get === section.id && "border-muted-foreground"
      )}
      onClick={(event) => {
        event.stopPropagation();
        set(section.id);
      }}
    >
      {get === section.id && (
        <div className="bg-muted absolute -top-14 w-full rounded border">
          <div className="flex items-center gap-1">
            <Button
              variant={"outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                editor.commands.toggleHeading({ level: 1 });
              }}
            >
              <Icons.Heading />
            </Button>

            <Button
              variant={"outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                editor.commands.setParagraph();
              }}
            >
              <Icons.Paragraph />
            </Button>

            <Button
              variant={"outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                editor.commands.toggleBold();
              }}
            >
              <Icons.Bold />
            </Button>

            <Button
              variant={"outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                editor.commands.toggleItalic();
              }}
            >
              <Icons.Italic />
            </Button>

            <Button
              variant={"outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                editor.commands.toggleUnderline();
              }}
            >
              <Icons.Underline />
            </Button>

            <Button
              variant={"outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                updateHeaderText({ ...section, content: editor.getJSON() });
              }}
            >
              Save
            </Button>
          </div>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
