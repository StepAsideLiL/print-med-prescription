"use client";

import { store } from "@/lib/store";
import { THeaderSection } from "@/lib/types";
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
  });

  if (editor === null) {
    return null;
  }

  return (
    <div style={section.style} className="relative">
      <div className="bg-muted absolute -top-14 w-full rounded border p-1">
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
      <EditorContent editor={editor} />
    </div>
  );
}
