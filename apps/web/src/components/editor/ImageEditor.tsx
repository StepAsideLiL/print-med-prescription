"use client";

import { store } from "@/lib/store";
import { TTemplateSectionSchema } from "@/lib/types";
import Icons from "@workspace/design-system/icons";
import { cn } from "@workspace/design-system/lib/utils";
import { Button } from "@workspace/design-system/ui/button";
import { Input } from "@workspace/design-system/ui/input";
import { Label } from "@workspace/design-system/ui/label";
import React, { useId, useState } from "react";

export default function ImageEditor({
  place,
  section,
}: {
  place: "header" | "footer";
  section: TTemplateSectionSchema;
}) {
  const id = useId();
  const { get, set } = store.SelectSection();
  const [file, setFile] = useState<File | null>();
  const { updateSectionContent } = store.UpdateSectionContent();
  const { removeSectionContent } = store.RemoveSectionContent();

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
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
              variant={"outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={() => {
                removeSectionContent({ place, section });
              }}
            >
              <Icons.Delete />
            </Button>

            <Button
              variant={"outline"}
              size={"sm"}
              className="cursor-pointer"
              onClick={async () => {
                if (file) {
                  updateSectionContent({
                    place,
                    section: {
                      ...section,
                      content: {
                        name: file.name,
                        buffer: file,
                        mimeType: file.type,
                      },
                    },
                  });
                }
              }}
            >
              Save
            </Button>
          </div>
        </div>
      )}

      <div className="min-h-28">
        <Label
          htmlFor={`${id}-image-input`}
          className="mx-auto h-28 w-28 overflow-hidden rounded-full"
        >
          <img
            src={
              file ? URL.createObjectURL(file) : "https://placehold.co/100x100"
            }
            className="h-full w-full object-cover"
          />
          <Input
            type="file"
            id={`${id}-image-input`}
            className="sr-only"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleFileChange(event)
            }
          />
        </Label>
      </div>
    </div>
  );
}
