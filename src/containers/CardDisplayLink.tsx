"use client";
import { cn } from "@dookdiks/utils";
import { links } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import copy from "clipboard-copy";
import { GoCopy } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Loading from "@/components/elements/Loading";
import Model from "@/components/elements/Model";
import LinkEditForm from "@/containers/LinkEditForm";
import Button from "@/components/button/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export const Card: FC<links & { url: string }> = ({ url, ...link }) => {
	const copyHandler = async (text: string) => {
		try {
			await copy(text);
		} catch (error) {
			console.log(error);
		}
	};

	const [showModel, setShowModel] = useState<boolean>(false);
	const [showDelete, setShowDelete] = useState<boolean>(false);
	const [deleteError, setDeleteError] = useState<string>("");
	const [loadDelete, setLoadDelete] = useState(false);

	const router = useRouter();

	const toggleModel = () => {
		setShowModel((prev) => !prev);
		setDeleteError("");
	};

	const toggleDelete = () => {
		setShowDelete((prev) => !prev);
		setDeleteError("");
	};

	const onDelete = async () => {
		setLoadDelete(true);
		try {
			const deleteRes = await axios.delete("/api/shortlink", {
				params: { id: link.id },
			});
			if (deleteRes.status === 200) {
				router.refresh();
				toggleDelete();
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setDeleteError(error.response?.data);
			}
		}
		setLoadDelete(false);
	};

	return (
		<>
			<Model visible={showModel} onClose={toggleModel} title="Edit short link">
				<LinkEditForm link={link} afrerSubmit={toggleModel} />
			</Model>
			<Model
				visible={showDelete}
				onClose={toggleDelete}
				title="Delete short link"
			>
				<p className="text-center">
					Are you sure you want to delete this short link?
				</p>
				<div className={cn("flex gap-2 justify-center mt-4")}>
					<Button className={cn("w-full")} onClick={toggleDelete}>
						Cancel
					</Button>
					<Button className={cn("w-full")} onClick={onDelete}>
						{loadDelete ? "Deleting..." : "Delete"}
					</Button>
				</div>
				<div className="h-4 mt-2">
					<p className="text-danger">{deleteError}</p>
				</div>
			</Model>
			<div className={cn("border-2 border-neutral rounded w-full p-2")}>
				<div
					className={cn(
						"text-xl text-neutral border-b-2 border-neutral mb-2 flex justify-between items-center"
					)}
				>
					<p className="w-80 md:w-auto text-ellipsis">{link.title}</p>
					<div className={cn("flex gap-2")}>
						<button onClick={toggleModel}>
							<FiEdit className="h-auto w-5" />
						</button>
						<button onClick={toggleDelete}>
							<AiOutlineDelete className="h-auto w-6" />
						</button>
					</div>
				</div>
				<div className={cn("grid grid-cols-1 lg:grid-cols-2 mt-2")}>
					<div className={cn("font-semibold")}>
						<p className="flex gap-2 items-center">
							Destination
							<button onClick={() => copyHandler(url + "/" + link.endpoint)}>
								<GoCopy className="h-auto w-5" />
							</button>
						</p>
					</div>
					<div
						className={cn("text-ellipsis cursor-pointer")}
						onClick={() => copyHandler(link.endpoint)}
					>
						{link.endpoint}
					</div>
					<div className={cn("font-semibold")}>
						<p className="flex gap-2 items-center">
							Shorten form
							<button onClick={() => copyHandler(url + "/" + link.entrypoint)}>
								<GoCopy className="h-auto w-5" />
							</button>
						</p>
					</div>
					<div
						className={cn("cursor-pointer")}
						onClick={() => copyHandler(url + "/" + link.entrypoint)}
					>
						{url + "/" + link.entrypoint}
					</div>
					<div className={cn("font-semibold")}>
						<p className="flex gap-2 items-center">Expiration date</p>
					</div>
					<div className={cn("cursor-pointer")}>
						{format(link.expireAt, 'dd MMMM yyyy')}
					</div>
				</div>
			</div>
		</>
	);
};

const CardDisplayLink: FC<{ links: links[] }> = ({ links }) => {
	const [url, setUrl] = useState<string>("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setUrl(new URL(window.location.href).origin);
		}
	}, []);

	if (!url)
		return (
			<div className="h-full flex justify-center items-center">
				<Loading />
			</div>
		);
	return links.map((link) => <Card url={url} {...link} key={link.id} />);
};

export default CardDisplayLink;
