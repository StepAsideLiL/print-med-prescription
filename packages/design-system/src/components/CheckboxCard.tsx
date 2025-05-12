import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/ui/label";
import { useId } from "react";

export default function CheckboxCard({
  label,
  sublabel,
  description,
}: {
  label: string;
  sublabel?: string;
  description?: string;
}) {
  const id = useId();

  return (
    <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full max-w-32 cursor-pointer items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
      <Checkbox
        id={id}
        className="order-1 after:absolute after:inset-0"
        aria-describedby={`${id}-description`}
      />
      <div className="grid grow gap-2">
        <Label htmlFor={id}>
          {label}{" "}
          {sublabel && (
            <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
              ({sublabel})
            </span>
          )}
        </Label>
        {description && (
          <p id={`${id}-description`} className="text-muted-foreground text-xs">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
