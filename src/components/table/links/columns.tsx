import {ColumnDef} from "@tanstack/react-table";
import {links} from "@prisma/client";
import {format} from "date-fns";
import Checkbox from "@/components/input/Checkbox";
import {cn} from "@dookdiks/utils";
import Button from "@/components/button/Button";
import {FaCopy} from "react-icons/fa";
import copy from "clipboard-copy";
import {MdModeEdit} from "react-icons/md";
import Link from "next/link";
import {BsSortAlphaDown, BsSortAlphaUp} from "react-icons/bs";

export const columns = ({url}: { url: string }): ColumnDef<links>[] => {

    const copyHandler = async (text: string) => {
      try {
        await copy(text);
      } catch (error) {
        console.log(error);
      }
    };

    return [
      {
        id: "select",
        header: ({table}) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
            aria-label="Select all"
          />
        ),
        cell: ({row}) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(checked) => row.toggleSelected(!!checked)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "title",
        cell:
          ({row}) => {
            return (
              <div className="w-[10rem]  truncate overflow-hidden">
                {row.getValue("title")}
              </div>
            );
          },
        header: ({column}) => {
          return <button
            className={cn('flex gap-2 items-center')}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            {column.getIsSorted() === "asc" ? <BsSortAlphaDown/> : <BsSortAlphaUp/>}
          </button>
        }
      }
      ,
      {
        accessorKey: "endpoint",
        cell:
          ({row}) => {
            return (
              <div className="w-[40rem]  truncate overflow-hidden">
                {row.getValue("endpoint")}
              </div>
            )
              ;
          },
        header:
          () => <div className="w-20">Endpoint</div>
      }
      ,
      {
        accessorKey: "entrypoint",
        header:
          () => <div className="min-w-44">Entry point</div>
      }
      ,
      {
        accessorKey: "createdAt",
        accessorFn:
          (row) => {
            return format(new Date(row.createdAt), "dd/MM/yyyy");
          },
        header: ({column}) => {
          return <button
            className={cn('flex gap-2 items-center')}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created at
            {column.getIsSorted() === "asc" ? <BsSortAlphaDown/> : <BsSortAlphaUp/>}
          </button>
        }
      }
      ,
      {
        accessorKey: "expireAt",
        accessorFn:
          (row) => {
            return format(new Date(row.expireAt), "dd/MM/yyyy");
          },
        header: ({column}) => {
          return <button
            className={cn('flex gap-2 items-center')}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc", true)}
          >
            Expire at
            {column.getIsSorted() === "asc" ? <BsSortAlphaDown/> : <BsSortAlphaUp/>}
          </button>
        },
      }
      ,
      {
        accessorKey: "id",
        header:
          "Actions",
        cell:
          ({row}) => {
            return (
              <>
                <div className={'flex justify-center items-center gap-2'}>
                  <Button className={cn('w-fit')}
                          onClick={() => copyHandler(url + "/" + row.getValue('entrypoint'))}>
                    <FaCopy/>
                  </Button>
                  <Link href={"/" + row.getValue('entrypoint') + "/edit"}
                        className={cn("p-2 w-full text-primary bg-secondary hover:bg-secondary-highlight rounded ease-in-out duration-200 flex justify-center items-center",)}
                        onClick={() => {
                        }}>
                    <MdModeEdit/>
                  </Link>
                </div>
              </>
            )
          }
      }
    ]
  }
;
