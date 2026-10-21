
"use client";

import {
  flexRender,
  stockFeatures,
  useTable,
  type ColumnDef,
  type StockFeatures,
} from "@tanstack/react-table";

import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";

import { Button } from "@/lib/components/Button";

interface DataTableProps<TData extends object> {
  columns: ColumnDef<StockFeatures, TData>[];
  data: TData[];
}

export function DataTable<TData extends object>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useTable({
    features: stockFeatures,
    data,
    columns,
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="data-table">
      <Table className="shad-table">
        <TableHeader className="bg-dark-200">
          {table
            .getHeaderGroups()
            .map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="shad-table-row-header"
              >
                {headerGroup.headers.map(
                  (header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column
                              .columnDef.header,
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
                className="shad-table-row"
              >
                {row
                  .getVisibleCells()
                  .map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef
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
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="table-actions">
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
          className="shad-gray-btn"
        >
          <Image
            src="/assets/icons/arrow.svg"
            width={24}
            height={24}
            alt="Previous page"
          />
        </Button>

        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="shad-gray-btn"
        >
          <Image
            src="/assets/icons/arrow.svg"
            width={24}
            height={24}
            alt="Next page"
            className="rotate-180"
          />
        </Button>
      </div>
    </div>
  );
}
