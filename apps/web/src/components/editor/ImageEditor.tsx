"use client";

import { THeaderSection } from "@/lib/types";
import {
  Document,
  EditorContent,
  Image,
  Text,
  useEditor,
} from "@workspace/editor";

export default function ImageEditor({ section }: { section: THeaderSection }) {
  const editor = useEditor({
    extensions: [Document, Text, Image],
    content: section.content,
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
    onFocus: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });

  return (
    <div style={section.style}>
      <EditorContent editor={editor} />
    </div>
  );
}
