"use client";

import { store } from "@/lib/store";
import { THeaderSection } from "@/lib/types";
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
      Paragraph.Paragraph,
      Heading.Heading,
      Bold.Bold,
      Italic.Italic,
      Underline.Underline,
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
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
