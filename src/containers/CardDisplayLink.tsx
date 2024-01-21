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
import ErrorMessage from "@/components/form/ErrorMessage";

import styles from "@/styles/container/linkDisplay.module.scss";

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
				<p style={{ textAlign: "center" }}>
					Are you sure you want to delete this short link?
				</p>
				<div className={cn(styles.delete_btn_container)}>
					<Button style={{ width: "100%" }} onClick={toggleDelete}>
						Cancel
					</Button>
					<Button style={{ width: "100%" }} onClick={onDelete}>
						{loadDelete ? "Deleting..." : "Delete"}
					</Button>
				</div>
				<div
					style={{
						height: "1rem",
						marginTop: "0.25rem",
					}}
				>
					<ErrorMessage>{deleteError}</ErrorMessage>
				</div>
			</Model>
			<div className={styles.item}>
				<div className={cn(styles.header)}>
					<p>{link.title}</p>
					<div>
						<button onClick={toggleModel}>
							<FiEdit />
						</button>
						<button onClick={toggleDelete}>
							<AiOutlineDelete />
						</button>
					</div>
				</div>
				<div className={cn(styles.content)}>
					<div className={cn(styles.title)}>Destination</div>
					<button onClick={() => copyHandler(url + "/" + link.endpoint)}>
						<GoCopy />
					</button>
					<div
						className={cn(styles.detail)}
						onClick={() => copyHandler(link.endpoint)}
					>
						{link.endpoint}
					</div>
					<div className={cn(styles.title)}>Shorten form</div>
					<button onClick={() => copyHandler(url + "/" + link.entrypoint)}>
						<GoCopy />
					</button>
					<div
						className={cn(styles.detail)}
						onClick={() => copyHandler(url + "/" + link.entrypoint)}
					>
						{url + "/" + link.entrypoint}
					</div>
					<div className={cn(styles.title)}>
						<p className="flex gap-2 items-center">Expiration date</p>
					</div>
					<div></div>
					<div className={cn(styles.detail)}>
						{format(link.expireAt, "dd MMMM yyyy")}
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
			<div className={cn(styles.container)}>
				<Loading />
			</div>
		);
	return links.map((link) => <Card url={url} {...link} key={link.id} />);
};

export default CardDisplayLink;
