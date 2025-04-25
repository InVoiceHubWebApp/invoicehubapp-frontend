import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import Link from 'next/link';

type PaginationProps = { page: number; pages: number };

function getPages(mid: number, size: number) {
  const half = Math.floor(size / 2);
  const middle = mid === half ? mid + 1 : mid;
  return Array.from({ length: size }, (_, i) => {
    return middle - half + i;
  });
}

export function Pagination({
  page: currentPage,
  pages: totalPages
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const currentPageValue = currentPage + 1;

  const totalOption = totalPages >= 5 ? 5 : totalPages;

  const start = Math.ceil(totalOption / 2);
  const end = totalPages - start + 1;
  const pages =
    currentPage > end
      ? getPages(end, totalOption)
      : currentPage < start
        ? getPages(start, totalOption)
        : getPages(currentPage, totalOption);

  return (
    <div className="flex gap-2">
      <Link
        data-inactive={1 === currentPageValue}
        className="border text-muted-foreground border-input bg-primary-foreground hover:bg-accent hover:text-accent-foreground h-7 w-7 flex items-center justify-center rounded-md data-[inactive=true]:pointer-events-none data-[inactive=true]:text-muted-foreground/30"
        href={{ query: { page: 1 } }}
      >
        <ChevronsLeft size={17} />
      </Link>
      <Link
        data-inactive={1 === currentPageValue}
        className="border text-muted-foreground border-input bg-primary-foreground hover:bg-accent hover:text-accent-foreground h-7 w-7 flex items-center justify-center rounded-md data-[inactive=true]:pointer-events-none data-[inactive=true]:text-muted-foreground/30"
        href={{
          query: {
            page: currentPageValue > 1 ? currentPageValue - 1 : currentPageValue
          }
        }}
      >
        <ChevronLeft size={17} />
      </Link>
      {pages.map((pageNumber) => (
        <Link
          key={pageNumber}
          className="border text-sm text-muted-foreground font-semibold border-input bg-primary-foreground hover:bg-accent hover:text-acc-h-7t-f7reground h-7 w-7 flex items-center justify-center rounded-md data-[active=true]:bg-border"
          href={{ query: { page: pageNumber } }}
          data-active={pageNumber === currentPageValue}
        >
          {pageNumber}
        </Link>
      ))}

      <Link
        data-inactive={totalPages === currentPageValue}
        className="border text-muted-foreground border-input bg-primary-foreground hover:bg-accent hover:text-accent-foreground h-7 w-7 flex items-center justify-center rounded-md data-[inactive=true]:pointer-events-none data-[inactive=true]:text-muted-foreground/30"
        href={{
          query: {
            page:
              currentPageValue >= totalPages
                ? currentPageValue
                : currentPageValue + 1
          }
        }}
      >
        <ChevronRight size={17} />
      </Link>
      <Link
        data-inactive={totalPages === currentPageValue}
        className="border text-muted-foreground border-input bg-primary-foreground hover:bg-accent hover:text-accent-foreground h-7 w-7 flex items-center justify-center rounded-md data-[inactive=true]:pointer-events-none data-[inactive=true]:text-muted-foreground/30"
        href={{ query: { page: totalPages } }}
      >
        <ChevronsRight size={17} />
      </Link>
    </div>
  );
}
