import { store } from "@/lib/store";
import { Button } from "@workspace/design-system/ui/button";
import TextEditor from "@/components/editor/TextEditor";
import ImageEditor from "@/components/editor/ImageEditor";

export default function TemplateSection({
  place,
}: {
  place: "header" | "footer";
}) {
  const { createTemplateSection } = store.CreateTemplateSection();
  const { get } = store.TemplateSection();
  const { addSectionContent } = store.AddSectionContent();

  if (get[place].length === 0) {
    return (
      <div className="flex min-h-28 items-center justify-center gap-2">
        {["1", "2", "3"].map((col) => (
          <Button
            key={col}
            variant={"outline"}
            className="cursor-pointer"
            onClick={() => createTemplateSection({ col, place })}
          >
            {col} Column
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      {get[place].map((section) => {
        if (section.contentType === "text") {
          return (
            <TextEditor key={section.id} place={place} section={section} />
          );
        }

        if (section.contentType === "img") {
          return (
            <ImageEditor key={section.id} place={place} section={section} />
          );
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
                addSectionContent({ place, section, contentType: "text" });
              }}
            >
              Add Text
            </Button>

            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={() => {
                addSectionContent({ place, section, contentType: "img" });
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
