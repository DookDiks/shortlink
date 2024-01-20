"use client";

import { useState } from "react";
import Button from "../components/button/Button";
import Model from "../components/elements/Model";
import AddShortLinkForm from "@/containers/AddShortLinkForm";

const AddLinkMobile = () => {
	const [showModel, setShowModel] = useState<boolean>(false);

	const toggleModel = () => {
		setShowModel((prev) => !prev);
	};
	return (
		<>
			<Model
				visible={showModel}
				onClose={toggleModel}
				title="Create short link"
			>
				<AddShortLinkForm afrerSubmit={toggleModel} />
			</Model>
			<Button className="w-full" onClick={toggleModel}>
				Create short link
			</Button>
		</>
	);
};

export default AddLinkMobile;
