"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useState } from "react";

type Item = {
  value: string;
  label: string;
};

type SearchBy = {
  items: Item[];
  loading?: boolean;
  onSearch: (value: string) => void;
  selected?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function SearchBy({
  items,
  loading,
  onSearch,
  selected,
  onChange,
  disabled = false,
}: SearchBy) {
  const [open, setOpen] = useState(false);
  const [search, setSeach] = useState<string>();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selected ? selected : "Selecione um item"}
            {loading ? (
              <Loader2 className="animate-spin opacity-50" />
            ) : (
              <ChevronsUpDown className="opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
        <Command>
          <CommandInput
            value={search}
            onValueChange={(value) => {
              setSeach(value);
              onSearch(value);
            }}
            placeholder="Buscar por usuário"
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>
              {search && search.length > 1 && items.length == 0 && !loading
                ? "Sem resultados"
                : "Digite o username para buscar"}
            </CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  keywords={[item.label, item.value]}
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    const value = `${item.label}_${item.value}`;
                    onChange(value);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selected === item.value ? "opacity-100" : "opacity-0",
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
