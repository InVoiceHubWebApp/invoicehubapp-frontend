"use client";
import { useNavigation } from "@/lib/navigation";
import Link from "next/link";

type Navigate = {
  title: string;
  path: string;
};

type NavigationProps = {
  items: Navigate[];
};
export function Navigation({ items }: NavigationProps) {
  const { pathname } = useNavigation();
  const paths = pathname.split("/");

  return (
    <div className="flex gap-1 bg-border-foreground p-1 rounded-md w-max">
      {items.map((item) => {
        const isCurrent = item.path.endsWith(paths[paths.length - 1]);
        return (
          <Link
            data-iscurrent={isCurrent}
            href={item.path}
            key={item.path}
            className="px-2 py-1 text-secondary-foreground font-semibold hover:text-primary hover:bg-primary-foreground data-[iscurrent=true]:text-primary data-[iscurrent=true]:bg-primary-foreground rounded-md"
          >
            <span>{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
