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
import { Fragment } from "react";

export default function MedicineList() {
  const { get: medList } = store.MedList();

  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead className="w-20 border text-center">Med Type</TableHead>
          <TableHead className=""></TableHead>
          <TableHead className="w-20 border text-center">Morning</TableHead>
          <TableHead className="w-20 border text-center">Noon</TableHead>
          <TableHead className="w-20 border text-center">Night</TableHead>
          <TableHead className="w-20 border text-center">Before Meal</TableHead>
          <TableHead className="w-20 border text-center">After Meal</TableHead>
          <TableHead className="w-20 border text-center">Duration</TableHead>
        </TableRow>
      </TableHeader>

      {medList.length === 0 ? null : (
        <TableBody>
          {medList.map((med) => (
            <Fragment key={med.id}>
              <TableRow key={med.id}>
                <TableCell>
                  {med.type === "tablet" ? "Tablet" : "Syrup"}
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-center">
                  {med.moring ? "1" : "0"}
                </TableCell>
                <TableCell className="text-center">
                  {med.noon ? "1" : "0"}
                </TableCell>
                <TableCell className="text-center">
                  {med.night ? "1" : "0"}
                </TableCell>
                <TableCell className="text-center">
                  {med.afterMeal ? "Yes" : "No"}
                </TableCell>
                <TableCell className="text-center">
                  {med.afterMeal ? "No" : "Yes"}
                </TableCell>
                <TableCell className="text-center">
                  {med.duration.lenght} {med.duration.unit}
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      )}
    </Table>
  );
}
