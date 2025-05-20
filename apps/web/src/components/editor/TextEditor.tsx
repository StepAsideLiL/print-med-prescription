"use client";

import {
  Document,
  EditorContent,
  Heading,
  JSONContent,
  Paragraph,
  Text,
  useEditor,
} from "@workspace/editor";

export default function TextEditor({ content }: { content: JSONContent }) {
  const editor = useEditor({
    extensions: [Document, Text, Paragraph, Heading],
    content: content,
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });

  return <EditorContent editor={editor} />;
}
