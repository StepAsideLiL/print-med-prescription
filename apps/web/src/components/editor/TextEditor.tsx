"use client";

import { THeaderSection } from "@/lib/types";
import {
  Document,
  EditorContent,
  Heading,
  Paragraph,
  Text,
  useEditor,
} from "@workspace/editor";

export default function TextEditor({ section }: { section: THeaderSection }) {
  const editor = useEditor({
    extensions: [Document, Text, Paragraph, Heading],
    content: section.content,
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });

  return (
    <div style={section.style}>
      <EditorContent editor={editor} />
    </div>
  );
}
