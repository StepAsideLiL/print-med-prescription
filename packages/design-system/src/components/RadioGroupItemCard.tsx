import { Label } from "@/ui/label";
import { RadioGroupItem } from "@/ui/radio-group";
import { useId } from "react";

export default function RadioGroupItemCard({
  value,
  label,
  sublabel,
  description,
}: {
  value: string;
  label: string;
  sublabel?: string;
  description?: string;
}) {
  const id = useId();

  return (
    <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full max-w-36 cursor-pointer items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
      <RadioGroupItem
        value={value}
        id={`${id}`}
        aria-describedby={`${id}-description`}
        className="order-1 after:absolute after:inset-0"
      />
      <div className="grid grow gap-2">
        <Label htmlFor={`${id}`}>
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
