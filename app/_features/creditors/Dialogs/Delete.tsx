"use client";
import { deleteCreditor } from "@/app/_service/creditors";
import type { Creditor } from "@/app/_types/creditors";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/lib/navigation";
import { useToast } from "@/lib/toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type DeleteProps = {
  creditor: Creditor;
};

export function Delete({ creditor }: DeleteProps) {
  const [loading, setLoading] = useState(false);

  const { router } = useNavigation();
  const { feedback } = useToast();

  const ondDelete = async () => {
    setLoading(true);
    const response = await deleteCreditor(creditor.id);
    setLoading(false);
    feedback({
      ...response,
      type: response.type as "success" | "destructive",
      onSuccess: () => router.push("/hub/management"),
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Essa ação apagará permanentemente o credor e não poderá ser desfeita.
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
