"use client";

import { searchAction } from "@/actions/searchAction";
import Button from "@/components/button/Button";
import Loading from "@/components/elements/Loading";
import Label from "@/components/form/Label";
import Input from "@/components/input/Input";
import { cn } from "@dookdiks/utils";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/routeError.module.scss";

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
		<div className={cn(styles.page)}>
			<div className={cn(styles.container)}>
				<h1 className={cn(styles.title)}>Not Found</h1>
				<p>There are no data in our database.</p>
				{url ? (
					<form className={styles.form} action={(e) => searchAction(search)}>
						<Input
							placeholder="/"
							className="opacity-0"
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
					<Loading />
				)}
			</div>
		</div>
	);
}
