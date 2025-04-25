'use client';

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table as TableLayout,
  TableRow
} from '@/components/ui/table';
import type { ReactNode } from 'react';
import { Card } from './Card';

type DataWithId = { id: number };

export type DataTableLabelProps<T extends DataWithId> = {
  column: DataTableColumn<T>;
};

export type DataTableCellProps<T extends DataWithId> = {
  row: T;
  column: DataTableColumn<T>;
};

export type DataTableColumn<T extends DataWithId> = {
  accessorKey: string;
  header: (props: DataTableLabelProps<T>) => ReactNode;
  cell: (props: DataTableCellProps<T>) => ReactNode;
  className?: string;
};

export type TableProps<T extends DataWithId> = {
  columns: DataTableColumn<T>[];
  data: T[];
  actions?: (data: T) => ReactNode;
};

export function Table<T extends DataWithId>({
  columns,
  data,
  actions
}: TableProps<T>) {
  return (
    <Card>
      <TableLayout className="p-0">
        <TableHeader>
          <TableRow className="bg-primary/10 border-b-0">
            {columns.map((column) => (
              <TableHead key={column.accessorKey}>
                {column.header({ column })}
              </TableHead>
            ))}
            {actions && <TableHead />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={column.accessorKey}>
                    {column.cell({ column, row: item })}
                  </TableCell>
                ))}
                {actions && <TableCell>{actions(item)}</TableCell>}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + Number(!!actions)}
                className="h-24 text-center"
              >
                Sem resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableLayout>
    </Card>
  );
}
