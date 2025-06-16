"use client";

import { store } from "@/lib/store";
import { TTemplateSectionSchema } from "@/lib/types";
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

export default function TextEditor({
  place,
  section,
}: {
  place: "header" | "footer";
  section: TTemplateSectionSchema;
}) {
  const { get, set } = store.SelectSection();
  const { updateSectionContent } = store.UpdateSectionContent();
  const { removeSectionContent } = store.RemoveSectionContent();

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
      Paragraph.Paragraph.configure({
        HTMLAttributes: {
          class: "text-xs",
        },
      }),
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
    content: section.content !== null ? section.content : "<p>Write...</p>",
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
        <div className="bg-muted absolute -top-14 w-fit rounded border">
          <div className="flex items-center gap-1 p-1">
            <Button
              variant={
                editor.isActive("heading", { level: 1 }) ? "default" : "outline"
              }
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              }}
            >
              <Icons.Heading />
            </Button>

            <Button
              variant={editor.isActive("paragraph") ? "default" : "outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                editor.chain().focus().setParagraph().run();
              }}
            >
              <Icons.Paragraph />
            </Button>

            <Button
              variant={editor.isActive("bold") ? "default" : "outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                editor.chain().focus().toggleBold().run();
              }}
            >
              <Icons.Bold />
            </Button>

            <Button
              variant={editor.isActive("italic") ? "default" : "outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                editor.chain().focus().toggleItalic().run();
              }}
            >
              <Icons.Italic />
            </Button>

            <Button
              variant={editor.isActive("underline") ? "default" : "outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                editor.chain().focus().toggleUnderline().run();
              }}
            >
              <Icons.Underline />
            </Button>

            <Button
              variant={"outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                removeSectionContent({ place, section });
              }}
            >
              <Icons.Delete className="text-destructive" />
            </Button>

            <Button
              variant={"outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                updateSectionContent({
                  place,
                  section: { ...section, content: editor.getJSON() },
                });
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
