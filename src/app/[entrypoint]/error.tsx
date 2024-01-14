"use client";

import { searchAction } from "@/actions/searchAction";
import Button from "@/components/button/Button";
import Loading from "@/components/elements/Loading";
import Label from "@/components/form/Label";
import Input from "@/components/input/Input";
import { cn } from "@dookdiks/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
		<div
			className={cn(
				"min-h-screen h-screen overflow-clip flex justify-center items-center bg-primary"
			)}
		>
			<div
				className={cn(
					"lg:border-2 border-neutral rounded lg:px-28 md:py-16 flex flex-col gap-4"
				)}
			>
				<h1 className={cn("text-4xl font-semibold mb-4")}>Not Found</h1>
				<p>There are no data in our database.</p>
				{url ? (
					<form
						className="flex flex-col gap-2"
						action={(e) => searchAction(search)}
					>
						<div className="relative">
							<Input
								placeholder="exampl"
								className="opacity-0"
								id="search"
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Label
								htmlFor="search"
								className="absolute top-1/2 left-1/2 h-full w-full rounded -translate-x-1/2 -translate-y-1/2 border-2 border-neutral flex items-center px-2"
							>
								<span className="hidden lg:block">{url}</span>
								<span className="lg:hidden block">/</span>
								<span>{search ? search : ""}</span>
							</Label>
						</div>
						<Button className="w-full" type="submit">
							Try again
						</Button>
					</form>
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
}
