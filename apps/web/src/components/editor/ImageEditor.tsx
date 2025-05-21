"use client";

import { store } from "@/lib/store";
import { THeaderSection } from "@/lib/types";
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

  const editor = useEditor({
    extensions: [Document, Text, Image],
    content: section.content,
  });

  if (editor === null) {
    return null;
  }

  return (
    <div style={section.style} className="relative">
      <div className="bg-mute absolute -top-10 w-full rounded border p-1">
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
