"use client";

import {cn} from "@dookdiks/utils";
import {links} from "@prisma/client";
import {FC, useEffect, useState} from "react";
import Loading from "@/components/elements/Loading";

import {DataTable} from "@/components/table/links/data-table";
import {columns} from "@/components/table/links/columns";

const CardDisplayLink: FC<{ links: links[] }> = ({links}) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(new URL(window.location.href).origin);
    }
  }, []);

  if (!url)
    return (
      <div className={cn("")}>
        <Loading/>
      </div>
    );

  return <DataTable columns={columns({url})} data={links}/>
};

export default CardDisplayLink;
