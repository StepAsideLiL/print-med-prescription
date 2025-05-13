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

export default function MedicineList() {
  const { get: medList } = store.MedList();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className=""></TableHead>
          <TableHead className="w-20 border text-center">Morning</TableHead>
          <TableHead className="w-20 border text-center">Noon</TableHead>
          <TableHead className="w-20 border text-center">Night</TableHead>
          <TableHead className="w-20 border text-center">Before Meal</TableHead>
          <TableHead className="w-20 border text-center">After Meal</TableHead>
        </TableRow>
      </TableHeader>

      {medList.length === 0 ? null : (
        <TableBody>
          {medList.map((med) => (
            <TableRow key={med.id}>
              <TableCell></TableCell>
              <TableCell>{med.moring ? "1" : "0"}</TableCell>
              <TableCell>{med.noon ? "1" : "0"}</TableCell>
              <TableCell>{med.night ? "1" : "0"}</TableCell>
              <TableCell>{med.afterMeal ? "Yes" : "No"}</TableCell>
              <TableCell>{med.afterMeal ? "No" : "Yes"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}
