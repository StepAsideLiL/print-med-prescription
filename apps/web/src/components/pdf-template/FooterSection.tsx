"use client";

import { store } from "@/lib/store";
import { footerSection } from "@/lib/store/footer";
import { Button } from "@workspace/design-system/ui/button";
import TextEditor from "@/components/editor/TextEditor";
import ImageEditor from "@/components/editor/ImageEditor";

export default function FooterSection() {
  const { get, set } = store.FooterSection();
  const { addFooterText } = store.AddFooterText();
  const { addFooterImage } = store.AddFooterImage();

  if (get.length === 0) {
    return (
      <div className="flex min-h-28 items-center justify-center gap-2">
        {["1", "2", "3"].map((col) => (
          <Button
            key={col}
            variant={"outline"}
            className="cursor-pointer"
            onClick={() =>
              set(
                Array.from({ length: parseInt(col) }).map(() =>
                  footerSection(col.toString())
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
        if (section.contentType === "text") {
          return <TextEditor key={section.id} section={section} />;
        }

        if (section.contentType === "img") {
          return <ImageEditor key={section.id} section={section} />;
        }

        return (
          <div
            key={section.id}
            style={section.style}
            className="flex min-h-28 flex-col items-center justify-center gap-1 border"
          >
            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={() => {
                addFooterText(section);
              }}
            >
              Add Text
            </Button>

            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={() => {
                addFooterImage(section);
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
