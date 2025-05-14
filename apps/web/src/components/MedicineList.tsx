"use client";

import { store } from "@/lib/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/design-system/ui/table";
import { Input } from "@workspace/design-system/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/design-system/ui/select";
import {
  TMedicationDuration,
  TMedicineType,
  TMedListSchema,
} from "@/lib/types";
import { Checkbox } from "@workspace/design-system/ui/checkbox";
import { Label } from "@workspace/design-system/ui/label";

export default function MedicineList() {
  const { get: medicineList } = store.MedicineList();

  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead className="w-20 border text-center">Med Type</TableHead>
          <TableHead className="border">Medicine Name</TableHead>
          <TableHead className="w-20 border text-center">Morning</TableHead>
          <TableHead className="w-20 border text-center">Noon</TableHead>
          <TableHead className="w-20 border text-center">Night</TableHead>
          <TableHead className="w-20 border text-center">Before Meal</TableHead>
          <TableHead className="w-20 border text-center">After Meal</TableHead>
          <TableHead className="w-28 border text-center">Duration</TableHead>
        </TableRow>
      </TableHeader>

      {medicineList.length === 0 ? null : (
        <TableBody>
          {medicineList.map((med) => (
            <TableRow key={med.id}>
              <TableCell className="px-1">
                <UpdateMedicineType med={med} />
              </TableCell>
              <TableCell className="px-1">
                <UpdateMedicineName med={med} />
              </TableCell>
              <TableCell className="pl-1 [&:has([role=checkbox])]:pr-1">
                <UpdateMedicineMorning med={med} />
              </TableCell>
              <TableCell className="pl-1 [&:has([role=checkbox])]:pr-1">
                <UpdateMedicineNoon med={med} />
              </TableCell>
              <TableCell className="pl-1 [&:has([role=checkbox])]:pr-1">
                <UpdateMedicineNight med={med} />
              </TableCell>
              <TableCell className="pl-1 [&:has([role=checkbox])]:pr-1">
                <UpdateMedicineBeforeMeal med={med} />
              </TableCell>
              <TableCell className="pl-1 [&:has([role=checkbox])]:pr-1">
                <UpdateMedicineAfterMeal med={med} />
              </TableCell>
              <TableCell className="px-1">
                <UpdateMedicineDuration med={med} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}

function UpdateMedicineType({ med }: { med: TMedListSchema }) {
  const { set } = store.UpdateMedicine();

  return (
    <Select
      value={med.type}
      onValueChange={(value: TMedicineType) =>
        set({
          ...med,
          type: value,
        })
      }
    >
      <SelectTrigger className="m-0 w-20 cursor-pointer px-1 py-0 text-xs md:text-xs">
        <SelectValue placeholder="Med Type" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="tablet" className="cursor-pointer">
          Tablet
        </SelectItem>
        <SelectItem value="syrup" className="cursor-pointer">
          Syrup
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

function UpdateMedicineName({ med }: { med: TMedListSchema }) {
  const { set } = store.UpdateMedicine();

  function handleChange(value: string) {
    set({ ...med, medicineName: value });
  }

  return (
    <Input
      placeholder="Med Name"
      className="m-0 w-full px-1 py-0 text-xs focus-visible:border focus-visible:ring-0 md:text-xs"
      value={med.medicineName}
      onChange={(event) => handleChange(event.target.value)}
    />
  );
}

function UpdateMedicineMorning({ med }: { med: TMedListSchema }) {
  const { set } = store.UpdateMedicine();

  function handleChange(value: boolean) {
    set({ ...med, morning: value });
  }

  return (
    <div className="border-input has-data-[state=checked]:border-primary/50 shadow-xs relative flex h-9 w-full max-w-32 items-center justify-between gap-2 rounded-md border py-1 pl-1 pr-2 outline-none">
      <Checkbox
        id={med.id}
        className="cursor-pointer after:absolute after:inset-0"
        aria-describedby={`${med.id}-description`}
        checked={med.morning}
        onCheckedChange={(value: boolean) => handleChange(value)}
      />

      <Label htmlFor={med.id} className="text-xs">
        {med.morning ? "1" : "0"}
      </Label>
    </div>
  );
}

function UpdateMedicineNoon({ med }: { med: TMedListSchema }) {
  const { set } = store.UpdateMedicine();

  function handleChange(value: boolean) {
    set({ ...med, noon: value });
  }

  return (
    <div className="border-input has-data-[state=checked]:border-primary/50 shadow-xs relative flex h-9 w-full max-w-32 items-center justify-between gap-2 rounded-md border py-1 pl-1 pr-2 outline-none">
      <Checkbox
        id={med.id}
        className="cursor-pointer after:absolute after:inset-0"
        aria-describedby={`${med.id}-description`}
        checked={med.noon}
        onCheckedChange={(value: boolean) => handleChange(value)}
      />

      <Label htmlFor={med.id} className="text-xs">
        {med.noon ? "1" : "0"}
      </Label>
    </div>
  );
}

function UpdateMedicineNight({ med }: { med: TMedListSchema }) {
  const { set } = store.UpdateMedicine();

  function handleChange(value: boolean) {
    set({ ...med, night: value });
  }

  return (
    <div className="border-input has-data-[state=checked]:border-primary/50 shadow-xs relative flex h-9 w-full max-w-32 items-center justify-between gap-2 rounded-md border py-1 pl-1 pr-2 outline-none">
      <Checkbox
        id={med.id}
        className="cursor-pointer after:absolute after:inset-0"
        aria-describedby={`${med.id}-description`}
        checked={med.night}
        onCheckedChange={(value: boolean) => handleChange(value)}
      />

      <Label htmlFor={med.id} className="text-xs">
        {med.night ? "1" : "0"}
      </Label>
    </div>
  );
}

function UpdateMedicineBeforeMeal({ med }: { med: TMedListSchema }) {
  const { set } = store.UpdateMedicine();

  function handleChange() {
    set({ ...med, afterMeal: false });
  }

  return (
    <div className="border-input has-data-[state=checked]:border-primary/50 shadow-xs relative flex h-9 w-full max-w-32 items-center justify-between gap-2 rounded-md border py-1 pl-1 pr-2 outline-none">
      <Checkbox
        id={med.id}
        className="cursor-pointer after:absolute after:inset-0"
        aria-describedby={`${med.id}-description`}
        checked={!med.afterMeal}
        onClick={handleChange}
      />

      <Label htmlFor={med.id} className="text-xs">
        {!med.afterMeal ? "Yes" : "No"}
      </Label>
    </div>
  );
}

function UpdateMedicineAfterMeal({ med }: { med: TMedListSchema }) {
  const { set } = store.UpdateMedicine();

  function handleChange() {
    set({ ...med, afterMeal: true });
  }

  return (
    <div className="border-input has-data-[state=checked]:border-primary/50 shadow-xs relative flex h-9 w-full max-w-32 items-center justify-between gap-2 rounded-md border py-1 pl-1 pr-2 outline-none">
      <Checkbox
        id={med.id}
        className="cursor-pointer after:absolute after:inset-0"
        aria-describedby={`${med.id}-description`}
        checked={med.afterMeal}
        onClick={handleChange}
      />

      <Label htmlFor={med.id} className="text-xs">
        {med.afterMeal ? "Yes" : "No"}
      </Label>
    </div>
  );
}

const durationList = [
  { id: "day", title: "Day" },
  { id: "week", title: "Week" },
  { id: "month", title: "Month" },
];
const durationListMap = new Map<string, string>(
  durationList.map((duration) => [duration.id, duration.title])
);
function UpdateMedicineDuration({ med }: { med: TMedListSchema }) {
  const { set } = store.UpdateMedicine();

  function handleDurationLengthChange(value: string) {
    set({
      ...med,
      duration: {
        lenght: parseInt(value),
        unit: med.duration.unit,
      },
    });
  }

  function handleDurationUnitChange(value: TMedicationDuration["unit"]) {
    set({
      ...med,
      duration: {
        lenght: med.duration.lenght,
        unit: value,
      },
    });
  }

  return (
    <div className="shadow-xs flex items-center rounded-md border px-1">
      <Input
        type="number"
        placeholder="Duration"
        className="border-none p-0 pr-2 text-right text-xs focus-visible:ring-0 md:text-xs"
        value={med.duration.lenght}
        onChange={(event) => handleDurationLengthChange(event.target.value)}
      />

      <Select
        value={med.duration.unit}
        onValueChange={(value: TMedicationDuration["unit"]) =>
          handleDurationUnitChange(value)
        }
      >
        <SelectTrigger className="cursor-pointer border-none p-0 text-xs focus-visible:ring-0 md:text-xs">
          <SelectValue placeholder="Duration Unit" />
        </SelectTrigger>

        <SelectContent>
          {durationList.map((duration) => (
            <SelectItem key={duration.id} value={duration.id}>
              {duration.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
