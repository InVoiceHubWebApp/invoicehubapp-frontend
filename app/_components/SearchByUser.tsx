"use client";

import { useState } from "react";
import type { User } from "../_types/user";
import { useDebounce } from "@/lib/debounce";
import { getUserBySearch } from "../_service/users";
import { SearchBy } from "./SearchBy";

type Item = {
  value: string;
  label: string;
};

type SearchByUserProps = {
  onChange: (value: string) => void;
  value?: string;
  disabled?: boolean;
};

export function SearchByUser({
  onChange,
  value,
  disabled = false,
}: SearchByUserProps) {
  const [users, setUsers] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async (value: string) => {
    setLoading(true);
    const { data }: { data: User[] } = await getUserBySearch(value);
    const users = data.map((item) => {
      return { label: item.username, value: `${item.id}` };
    });
    setUsers(users);
    setLoading(false);
  };

  const { debounce, loading: loadingDebounce } = useDebounce();
  const searchDebounce = debounce(onSearch, 1000);

  const user = value ? value.split("_") : undefined;
  const selected = user ? `${user[0]}` : undefined;

  return (
    <SearchBy
      items={users}
      onChange={onChange}
      selected={selected}
      onSearch={searchDebounce}
      loading={loading || loadingDebounce}
      disabled={disabled}
    />
  );
}
