"use client";

import {
  flexRender,
  stockFeatures,
  useTable,
  type ColumnDef,
  type StockFeatures,
} from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";

import { Button } from "@/lib/ui/button";

interface DataTableProps<
  TData extends object
> {
  columns: ColumnDef<
    StockFeatures,
    TData
  >[];
  data: TData[];
}

export function DataTable<
  TData extends object
>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useTable({
    features: stockFeatures,
    data,
    columns,
  });

  const rows =
    table.getRowModel().rows;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* TABLE */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-slate-50">
            {table
              .getHeaderGroups()
              .map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-slate-200 hover:bg-transparent"
                >
                  {headerGroup.headers.map(
                    (header) => (
                      <TableHead
                        key={header.id}
                        className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header
                                .column
                                .columnDef
                                .header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  )}
                </TableRow>
              ))}
          </TableHeader>

          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="
                    border-b
                    border-slate-100
                    transition-colors
                    last:border-0
                    hover:bg-slate-50
                  "
                >
                  {row
                    .getVisibleCells()
                    .map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-5 py-4 text-sm text-slate-700"
                      >
                        {flexRender(
                          cell.column
                            .columnDef
                            .cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length
                  }
                  className="h-40 text-center"
                >
                  <div>
                    <p className="font-medium text-slate-700">
                      No appointments
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      There are no
                      appointments to
                      display.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-5 py-3">
        <p className="text-sm text-slate-500">
          {rows.length}{" "}
          {rows.length === 1
            ? "appointment"
            : "appointments"}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() =>
              table.previousPage()
            }
            disabled={
              !table.getCanPreviousPage()
            }
            className="h-9 w-9 p-0"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() =>
              table.nextPage()
            }
            disabled={
              !table.getCanNextPage()
            }
            className="h-9 w-9 p-0"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}