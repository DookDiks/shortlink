"use client";

import Button from "@/components/button/Button";
import {cn} from "@dookdiks/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import Select from "@/components/input/Select";
import {AiOutlineDelete} from "react-icons/ai";
import {deleteLink} from "@/actions/shortLink";
import {BiSolidError} from "react-icons/bi";
import {useToseter} from "@/utils/useToaster";
import {useRouter} from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
                                           columns,
                                           data,
                                         }: DataTableProps<TData, TValue>) {
  const router = useRouter();

  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])

  const [loadDelete, setLoadDelete] = useState(false);

  const {setToast} = useToseter();

  // NOTE - Client Action for delete function.
  const clientDeleteAction = async () => {
    setLoadDelete(true);

    const idList = table.getSelectedRowModel().rows.map((row) => row.getValue("id")) satisfies string[]
    try {
      await deleteLink(idList);
      table.setRowSelection({});
      return setLoadDelete(false);
    } catch (error) {
      if (error instanceof Error) {
        setToast(error.message, <BiSolidError/>);
        return setLoadDelete(false);
      }
      setToast("Something went wrong!", <BiSolidError/>);
      return setLoadDelete(false);
    }
  };

  // NOTE -Table Hooks
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel({initialSync: true}),
    enableMultiRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
      sorting,
    }
  });

  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  return (
    <>
      <div className={cn('mb-2 flex gap-4 h-fit justify-between')}>
        <div className={cn('flex gap-2 items-center')}>
          <Select className={cn('w-20 py-1')} defaultValue={pageSize}
                  onChange={(e) => setPageSize(Number.parseInt(e.target.value))}>
            {[1, 10, 20, 30, 40, 50].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </div>
        <div className={cn('flex gap-4')}>
          <form action={clientDeleteAction}>
            <Button className={cn('w-28 flex gap-2 justify-center items-center p-1 h-full')}>
              <AiOutlineDelete/> {loadDelete ? "Deleting..." : <>
              {`Delete ${table.getSelectedRowModel().rows.length}`}</>
            }
            </Button>
          </form>
          <Button className={cn('w-28 flex gap-2 justify-center items-center p-1')}
                  onClick={() => router.push('/create/link')}>
            Create
          </Button>
        </div>
      </div>
      <div className="border-secondary w-full overflow-auto rounded border-2 h-full">
        <table className="w-full">
          <thead className="text-primary bg-secondary sticky top-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} className={cn("p-2 text-start")}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </th>
                );
              })}
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn("border-secondary border-b")}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={cn("p-2 text-start")}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center">
                No results.
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
      <section className={cn('flex justify-center')}>
        <div
          className="flex w-full items-center justify-center md:justify-between lg:max-w-4xl space-x-2 py-4 disabled:bg-primary">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={cn('hidden md:block w-32')}
          >
            Previous
          </Button>
          <div className={cn('flex gap-4')}>
            {table.getPageOptions().map((page) => {
              const min = table.getState().pagination.pageIndex - 2;
              const max = table.getState().pagination.pageIndex + 2;
              if (page < min || page > max) return null;
              return (
                <Button
                  key={page}
                  className={cn(
                    "aspect-square h-12 w-auto disabled:bg-primary disabled:text-secondary disabled:border-2 disabled:border-secondary disabled:cursor-not-allowed",
                  )}
                  disabled={page == table.getState().pagination.pageIndex}
                  onClick={() => {
                    table.setPageIndex(page);
                  }}
                >
                  {page + 1}
                </Button>
              );
            })}
          </div>
          <Button
            onClick={() => table.setPageIndex((prev) => prev + 1)}
            disabled={!table.getCanNextPage()}
            className={cn('hidden md:block w-32')}
          >
            Next
          </Button>
        </div>
      </section>
    </>
  );
}
