"use client";

import { store } from "@/lib/store";
import { headerSection } from "@/lib/store/header";
import { Button } from "@workspace/design-system/ui/button";
import TextEditor from "@/components/editor/TextEditor";
import ImageEditor from "@/components/editor/ImageEditor";

export default function TemplateHeaderSection() {
  const { get, set } = store.HeaderSection();
  const { addHeaderText } = store.AddHeaderText();
  const { addHeaderImage } = store.AddHeaderImage();

  if (get.length === 0) {
    return (
      <div className="flex items-center justify-center gap-2">
        {["1", "2", "3"].map((col) => (
          <Button
            key={col}
            variant={"outline"}
            className="cursor-pointer"
            onClick={() =>
              set(
                Array.from({ length: parseInt(col) }).map(() =>
                  headerSection(col.toString())
                )
              )
            }
          >
            {col} Column
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      {get.map((section) => {
        if (section.contentType === "text" && section.content !== null) {
          return <TextEditor key={section.id} section={section} />;
        }

        if (section.contentType === "img" && section.content !== null) {
          return <ImageEditor key={section.id} section={section} />;
        }

        return (
          <div
            key={section.id}
            style={section.style}
            className="flex flex-col items-center justify-center gap-1 border py-5"
          >
            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={() => {
                addHeaderText(section);
              }}
            >
              Add Text
            </Button>

            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={() => {
                addHeaderImage(section);
              }}
            >
              Add Image
            </Button>
          </div>
        );
      })}
    </div>
  );
}
