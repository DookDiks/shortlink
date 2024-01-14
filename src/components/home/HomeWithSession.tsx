import { cn } from "@dookdiks/utils";
import Button from "@/components/button/Button";
import AddShortLinkForm from "@/components/home/AddShortLinkForm";
import AddLinkMobile from "@/components/home/AddLinkMobile";
import CardDisplayLink from "@/components/home/CardDisplayLink";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/utils/session";
import HomeNav from "@/components/nav/HomeNav";

const HomeWithSession = async () => {
	const session = await getSession();
	const links = await prisma.links.findMany({
		where: {
			userId: session.id,
		},
	});
	return (
		<>
			<HomeNav />
			<section className={cn("min-h-screen h-screen text-neutral")}>
				<div
					className={cn(
						"flex flex-col lg:grid lg:grid-cols-2 gap-2 p-0 pt-[4.75rem] lg:p-4 lg:pt-20 h-full"
					)}
				>
					<section
						className={cn(
							"p-2 h-full min-h-[15rem] border-t-2 border-b-2 lg:border-2 rounded-sm border-neutral flex justify-start items-center flex-col gap-2 overflow-clip overflow-y-auto"
						)}
					>
						<CardDisplayLink links={links} />
					</section>
					<section
						className={cn(
							"p-2 h-fit lg:h-full w-full bg-primary border-t-2 lg:border-2 lg:rounded-sm border-neutral lg:flex justify-center items-center"
						)}
					>
						<div className="lg:hidden block">
							<AddLinkMobile />
						</div>
						<div className="hidden lg:block">
							<AddShortLinkForm />
						</div>
					</section>
				</div>
			</section>
		</>
	);
};

export default HomeWithSession;
