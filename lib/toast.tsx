import { useToast as useToastHook } from "@/hooks/use-toast";

type Feedback = {
  type: "success" | "destructive";
  description?: string;
  title?: string;
  onSuccess?: () => void;
  onError?: () => void;
};

export function useToast() {
  const { toast } = useToastHook();

  function feedback(data: Feedback) {
    const { type, title, description, onSuccess, onError } = data;
    toast({
      variant: type,
      title,
      description,
    });

    if (type == "success" && onSuccess) {
      onSuccess();
    }

    if (type == "destructive" && onError) {
      onError();
    }
  }

  return { toast, feedback };
}
