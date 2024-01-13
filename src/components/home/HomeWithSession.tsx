import { cn } from "@dookdiks/utils";
import Button from "@/components/button/Button";
import AddShortLinkForm from "@/components/home/AddShortLinkForm";
import Logo from "@/components/logo/DookDik";
import { prisma } from "@/lib/prisma";
import { signOutAction } from "@/actions/signOutAction";
import { getSession } from "@/utils/session";

const HomeWithSession = async () => {
	const session = await getSession();
	const links = await prisma.links.findMany({
		where: {
			userId: session.id,
		},
	});

	return (
		<>
			<nav
				className={cn(
					"border-neutral border-b-2 p-2 flex items-center justify-between fixed w-full bg-primary z-10"
				)}
			>
				<div className={cn("flex items-center gap-4")}>
					<Logo className="h-auto w-14 fill-neutral" />
					Short link
				</div>
				<form action={signOutAction}>
					<Button type="submit" className="px-4 py-2">
						Sign out
					</Button>
				</form>
			</nav>
			<section className={cn("min-h-screen h-screen text-neutral")}>
				<div
					className={cn(
						"grid grid-cols-1 lg:grid-cols-2 gap-2 p-4 pt-20 h-full"
					)}
				>
					<section
						className={cn(
							"p-2 h-full border-2 rounded-sm border-neutral flex justify-start items-center flex-col"
						)}
					>
						{links.map((link) => {
							return (
								<>
									<div
										key={link.id}
										className={cn("border-2 border-neutral rounded w-full p-2")}
									>
										<div
											className={cn(
												"text-xl text-neutral border-b-2 border-neutral mb-2"
											)}
										>
											{link.title}
										</div>
										<div className={cn("grid grid-cols-2 mt-2")}>
											<div className={cn("font-semibold")}>Destination</div>
											<div className={cn("")}>{link.endpoint}</div>
											<div className={cn("font-semibold")}>Shorten form</div>
											<div className={cn("")}>{link.entrypoint}</div>
										</div>
									</div>
								</>
							);
						})}
					</section>
					<section
						className={cn(
							"p-2 h-full border-2 rounded-sm border-neutral flex justify-center items-center"
						)}
					>
						<AddShortLinkForm />
					</section>
				</div>
			</section>
		</>
	);
};

export default HomeWithSession;
