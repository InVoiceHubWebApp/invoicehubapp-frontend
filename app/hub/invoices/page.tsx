import { ContentData, Dialog, Pagination } from '@/app/_components';
import {
  CreateInvoice,
  InvoiceForm,
  TableInvoices,
  DeleteDialog
} from '@/app/_features/invoices';
import { Fetcher } from '@/lib/fetcher';
import type { Page } from '@/app/_types/Pagination';
import type { Invoice } from '@/app/_types/invoices';
import { ShoppingBasket } from 'lucide-react';

type PageProps = { searchParams: Promise<Record<string, string>> };
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const { page: currentPage, open } = params;
  const paramsValues = {
    ...params,
    page: currentPage ? `${Number(currentPage) - 1}` : '0'
  };
  const urlSearchParams = new URLSearchParams(paramsValues);

  const { data, info } = await Fetcher<Page<Invoice>>({
    path: `/invoices?${urlSearchParams.toString()}`
  });

  const { items, page, pages, total } = data as Page<Invoice>;
  const openId = open ? Number(open.split('_').at(-1)) : undefined;
  const selectedItem = items.find((item) => item.id == openId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between h-10 max-md:flex-col max-md:space-y-4 max-md:h-auto max-md:items-start">
        <h2 className="text-2xl">Compras</h2>
        <Dialog title="Nova compra" trigger={<CreateInvoice />}>
          <InvoiceForm />
        </Dialog>
      </div>
      <div className="flex items-center gap-2">
        <ShoppingBasket />
        <h2> {total} items</h2>
      </div>
      <ContentData info={info}>
        <TableInvoices invoices={items} />
        <Pagination page={page} pages={pages} />
      </ContentData>

      {selectedItem && (
        <>
          <Dialog
            title="Editar credor"
            searchParamValue={`invoice_edit_${selectedItem.id}`}
          >
            <InvoiceForm defaultValues={selectedItem} />
          </Dialog>
          <Dialog
            title="Tem certeza?"
            searchParamValue={`invoice_delete_${selectedItem.id}`}
          >
            <DeleteDialog invoice={selectedItem} />
          </Dialog>
        </>
      )}
    </div>
  );
}
