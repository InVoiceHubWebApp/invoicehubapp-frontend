"use client";

import { CreditorType, type Creditor } from "@/app/_types/creditors";
import { DialogTrigger, Table } from "@/app/_components";
import dayjs from "dayjs";
import type { DataTableColumn } from "@/app/_components/Table";
import { Pencil, Trash2 } from "lucide-react";

export type CreditorsProps = {
  creditors: Creditor[];
};

export const columns: DataTableColumn<Creditor>[] = [
  {
    accessorKey: "name",
    header: () => "Nome",
    cell: ({ row }) =>
      `${row.name} ${row.user_as_creditor ? `(${row.user_as_creditor.username})` : ""}`,
  },
  {
    accessorKey: "creditor_type",
    header: () => "Tipo",
    cell: ({ row }) => CreditorType[row.creditor_type],
  },
  {
    accessorKey: "due_date",
    header: () => "Vencimento",
    cell: ({ row }) => dayjs(row.due_date).format("DD/MM"),
  },
  {
    accessorKey: "limit_value",
    header: () => "Limite",
    cell: ({ row }) => {
      if (!row.limit_value) return "-";
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BRL",
      }).format(row.limit_value);

      return formatted;
    },
  },
];

export function Creditors({ creditors }: CreditorsProps) {
  return (
    <Table<Creditor>
      columns={columns}
      data={creditors}
      actions={(item: Creditor) => (
        <div className="gap-2 flex">
          <DialogTrigger
            searchParamValue={`creditor_edit_${item.id}`}
            props={{ variant: "outline", size: "icon" }}
          >
            <Pencil />
          </DialogTrigger>
          <DialogTrigger
            searchParamValue={`creditor_delete_${item.id}`}
            props={{ variant: "outline", size: "icon" }}
          >
            <Trash2 />
          </DialogTrigger>
        </div>
      )}
    />
  );
}
