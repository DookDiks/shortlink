import { prisma } from "@/lib/prisma";
import { permanentRedirect } from "next/navigation";

const RedirectPage = async ({
	params: { entrypoint },
}: {
	params: { entrypoint: string };
}) => {
	const link = await prisma.links.findUnique({
		where: {
			entrypoint: entrypoint,
		},
	});

	if (!link) throw new Error("Not found");

	return permanentRedirect(link.endpoint);
};

export default RedirectPage;
