"use client";

import {
  Document,
  EditorContent,
  Image,
  JSONContent,
  Text,
  useEditor,
} from "@workspace/editor";

export default function ImageEditor({ content }: { content: JSONContent }) {
  const editor = useEditor({
    extensions: [Document, Text, Image],
    content: content,
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
    onFocus: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });

  return <EditorContent editor={editor} />;
}
