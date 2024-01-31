"use client";

import {searchAction} from "@/actions/searchAction";
import Button from "@/components/button/Button";
import Loading from "@/components/elements/Loading";
import Label from "@/components/form/Label";
import Input from "@/components/input/Input";
import {cn} from "@dookdiks/utils";
import {useEffect, useState} from "react";

export default function Error({
                                error,
                                reset,
                              }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [search, setSearch] = useState("");

  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(new URL(window.location.href).origin);
    }
  }, []);

  return (
    <div className={cn("h-screen overflow-clip bg-primary flex justify-center items-center p-2 lg:p-0")}>
      <div className={cn("border-2 border-secondary rounded p-8 flex flex-col gap-2")}>
        <h1 className={cn("text-2xl font-semibold")}>Not Found</h1>
        <p>There are no data in our database.</p>
        {url ? (
          <form className={cn('flex flex-col w-full lg:w-fit md:min-w-[30rem] relative')} action={(e) => searchAction(search)}>
            <Input
              placeholder="/"
              className="lg:w-full"
              id="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Label htmlFor="search">
              <span>{url}</span>
              <span>/</span>
              <span>{search ? search : ""}</span>
            </Label>

            <Button className="w-full" type="submit">
              Try again
            </Button>
          </form>
        ) : (
          <Loading/>
        )}
      </div>
    </div>
  );
}
