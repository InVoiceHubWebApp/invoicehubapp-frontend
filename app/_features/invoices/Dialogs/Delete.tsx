"use client";
import { deleteInvoice } from "@/app/_service/invoices";
import type { Invoice } from "@/app/_types/invoices";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/lib/navigation";
import { useToast } from "@/lib/toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type DeleteProps = {
  invoice: Invoice;
};

export function Delete({ invoice }: DeleteProps) {
  const [loading, setLoading] = useState(false);

  const { router } = useNavigation();
  const { feedback } = useToast();

  const ondDelete = async () => {
    setLoading(true);
    const response = await deleteInvoice(invoice.id);
    setLoading(false);
    feedback({
      ...response,
      type: response.type as "success" | "destructive",
      onSuccess: () => router.push("/hub/invoices"),
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Essa ação apagará permanentemente a compra e não poderá ser desfeita.
      </p>

      <div className="flex justify-end">
        <Button disabled={loading} onClick={ondDelete} variant="destructive">
          {loading && <Loader2 className="animate-spin" />}
          Tenho certeza
        </Button>
      </div>
    </div>
  );
}
