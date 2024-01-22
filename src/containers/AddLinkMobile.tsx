"use client";

import { useState } from "react";
import Button from "@/components/button/Button";
import Model from "@/components/elements/Model";
import AddShortLinkForm from "@/containers/AddShortLinkForm";
import { useToseter } from "@/utils/useToaster";

const AddLinkMobile = () => {
	const [showModel, setShowModel] = useState<boolean>(false);

	const { Toaster } = useToseter();

	const toggleModel = () => {
		setShowModel((prev) => !prev);
	};
	return (
		<>
			<Toaster />
			<Model
				visible={showModel}
				onClose={toggleModel}
				title="Create short link"
			>
				<AddShortLinkForm afrerSubmit={toggleModel} />
			</Model>
			<Button style={{ width: "100%" }} onClick={toggleModel}>
				Create short link
			</Button>
		</>
	);
};

export default AddLinkMobile;
