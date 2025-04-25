import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function Create() {
  return (
    <Button className="max-md:w-full">
      <Plus />
      Novo credor
    </Button>
  );
}
