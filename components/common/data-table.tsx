"use client";

import {
  Table,
  TableContent,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  TableScrollContainer,
  Spinner,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@heroui/react";
import { useMemo } from "react";

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T = Record<string, unknown>> {
  columns: DataTableColumn<T>[];
  data: T[];
  page?: number;
  limit?: number;
  total?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onPageChange?: (page: number) => void;
  onSortChange?: (sortBy: string, sortOrder: "asc" | "desc") => void;
  selectionMode?: "none" | "single" | "multiple";
  selectedKeys?: Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  isLoading?: boolean;
  emptyContent?: React.ReactNode;
  rowKey?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  page = 1,
  limit = 10,
  total = 0,
  onPageChange,
  isLoading = false,
  emptyContent = "No data found.",
  rowKey = "id",
}: DataTableProps<T>) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("ellipsis");
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }

    return pages;
  }, [page, totalPages]);

  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableScrollContainer>
          <TableContent aria-label="Data table">
            <TableHeader>
              {columns.map((col) => (
                <TableColumn key={col.key}>{col.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="flex justify-center py-8">
                      <Spinner size="md" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="flex justify-center py-8 text-default-500">
                      {emptyContent}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, rowIndex) => (
                  <TableRow key={String(row[rowKey] ?? rowIndex)}>
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        {col.render
                          ? col.render(row[col.key], row, rowIndex)
                          : ((row[col.key] as React.ReactNode) ?? "-")}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </TableContent>
        </TableScrollContainer>
      </Table>

      {total > limit && onPageChange && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  isDisabled={page <= 1}
                  onPress={() => onPageChange(page - 1)}
                >
                  Previous
                </PaginationPrevious>
              </PaginationItem>
              {pageNumbers.map((p, idx) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === page}
                      onPress={() => onPageChange(p as number)}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  isDisabled={page >= totalPages}
                  onPress={() => onPageChange(page + 1)}
                >
                  Next
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
