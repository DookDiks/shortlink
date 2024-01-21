import { cn } from "@dookdiks/utils";
import AddShortLinkForm from "@/containers/AddShortLinkForm";
import AddLinkMobile from "@/containers/AddLinkMobile";
import CardDisplayLink from "@/containers/CardDisplayLink";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/utils/session";
import HomeNav from "@/components/nav/HomeNav";
import styles from "@/styles/pages/homeSession.module.scss";

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
			<section className={cn(styles.containers)}>
				<div className={cn(styles.display)}>
					<section className={cn(styles.list_container)}>
						<CardDisplayLink links={links} />
					</section>
					<section className={cn(styles.form_container)}>
						<div className={styles.mobile}>
							<AddLinkMobile />
						</div>
						<div className={styles.window}>
							<AddShortLinkForm />
						</div>
					</section>
				</div>
			</section>
		</>
	);
};

export default HomeWithSession;
