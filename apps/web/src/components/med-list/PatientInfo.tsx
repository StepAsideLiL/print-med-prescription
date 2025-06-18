"use client";

import { Input } from "@workspace/design-system/ui/input";
import { Label } from "@workspace/design-system/ui/label";
import { RAC } from "@workspace/design-system/lib/rac";
import {
  DateField,
  DateInput,
} from "@workspace/design-system/ui/datefield-rac";
import { date } from "@workspace/design-system/lib/date";
import { store } from "@/lib/store";

export default function PatientInfo() {
  const { get, set } = store.PatientInfo();

  return (
    <section className="border-foreground flex items-center border-y px-10">
      <Label htmlFor="patient-name">Name</Label>
      <Input
        id="patient-name"
        placeholder="Patient Name"
        className="border-none ring-0 focus-visible:border-none focus-visible:ring-0"
        value={get.name}
        onChange={(event) => set({ ...get, name: event.target.value })}
      />

      <Label htmlFor="patient-age">Age</Label>
      <Input
        id="patient-age"
        type="number"
        placeholder="Patient Age"
        className="border-none ring-0 focus-visible:border-none focus-visible:ring-0"
        value={get.age}
        onChange={(event) => set({ ...get, age: parseInt(event.target.value) })}
        onFocus={(event) => event.target.select()}
      />

      <DateField
        className="flex items-center gap-2"
        value={
          get.date
            ? date.parseDate(get.date)
            : date.today(date.getLocalTimeZone())
        }
        onChange={(event) => {
          if (event === null) {
            return;
          }
          set({ ...get, date: event.toDate.toString() });
          console.log(event);
        }}
      >
        <RAC.Label className="cursor-default">Date</RAC.Label>
        <DateInput />
      </DateField>
    </section>
  );
}
