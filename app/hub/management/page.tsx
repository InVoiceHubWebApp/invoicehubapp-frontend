import { Dialog, ContentData, Pagination } from '@/app/_components';
import {
  ButtonCreate,
  TableCreditors,
  CreditorForm,
  DeleteDialog
} from '@/app/_features';
import type { Creditor } from '@/app/_types/creditors';
import type { Page } from '@/app/_types/Pagination';
import { Fetcher } from '@/lib/fetcher';
import { CreditCard } from 'lucide-react';

type PageProps = { searchParams: Promise<Record<string, string>> };

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const { page: currentPage, open } = params;
  const paramsValues = {
    ...params,
    page: currentPage ? `${Number(currentPage) - 1}` : '0'
  };
  const urlSearchParams = new URLSearchParams(paramsValues);

  const { data, info } = await Fetcher<Page<Creditor>>({
    path: `/creditors?${urlSearchParams.toString()}`
  });
  const { items, page, pages, total } = data as Page<Creditor>;
  const openId = open ? Number(open.split('_').at(-1)) : undefined;
  const selectedItem = items.find((item) => item.id == openId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between h-10 max-md:flex-col max-md:space-y-4 max-md:h-auto max-md:items-start">
        <h2 className="text-2xl">Credores/Devedores</h2>
        <Dialog title="Novo credor" trigger={<ButtonCreate />}>
          <CreditorForm />
        </Dialog>
      </div>
      <div className="flex items-center gap-2">
        <CreditCard />
        <h2> {total} items</h2>
      </div>

      <ContentData info={info}>
        <TableCreditors creditors={items} />
        <Pagination page={page} pages={pages} />
      </ContentData>
      {selectedItem && (
        <>
          <Dialog
            title="Editar credor"
            searchParamValue={`creditor_edit_${selectedItem.id}`}
          >
            <CreditorForm defaultValues={selectedItem} />
          </Dialog>
          <Dialog
            title="Tem certeza?"
            searchParamValue={`creditor_delete_${selectedItem.id}`}
          >
            <DeleteDialog creditor={selectedItem} />
          </Dialog>
        </>
      )}
    </div>
  );
}
