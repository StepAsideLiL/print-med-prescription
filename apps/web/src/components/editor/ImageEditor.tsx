"use client";

import { store } from "@/lib/store";
import { THeaderSection } from "@/lib/types";
import { cn } from "@workspace/design-system/lib/utils";
import { Button } from "@workspace/design-system/ui/button";
import {
  Document,
  EditorContent,
  Image,
  Text,
  useEditor,
} from "@workspace/editor";
import React from "react";

export default function ImageEditor({ section }: { section: THeaderSection }) {
  const { updateHeaderImage } = store.UpdateHeaderImage();
  const { get, set } = store.SelectSection();

  const editor = useEditor({
    extensions: [Document.Document, Text.Text, Image.Image],
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
      <div className="bg-muted absolute -top-14 w-full rounded border p-1">
        <Button
          variant={"secondary"}
          size={"sm"}
          className="cursor-pointer"
          onClick={() => {
            updateHeaderImage({ ...section, content: editor.getJSON() });
          }}
        >
          Save
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
