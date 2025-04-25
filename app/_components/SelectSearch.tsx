'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { useState } from 'react';

type Item = {
  value: string;
  label: string;
};

type SelectSearchProps = {
  items: Item[];
  selected?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
};

export function SelectSearch({
  items,
  selected,
  onChange,
  disabled = false,
  loading = false
}: SelectSearchProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected
            ? items.find((item) => item.value === selected)?.label
            : 'Selecione um item'}
          {loading ? (
            <Loader2 className="opacity-50 animate-spin" />
          ) : (
            <ChevronsUpDown className="opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
        <Command className="overflow-auto max-h-[200px]">
          <CommandInput placeholder="Buscar" className="h-9" />
          <CommandList>
            <CommandEmpty>Sem resultados</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === selected ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      selected === item.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
