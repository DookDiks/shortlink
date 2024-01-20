import HomeWithSession from "@/containers/home/HomeWithSession";
import { cn } from "@dookdiks/utils";

export default function Home() {
	return (
		<main className={cn('bg-primary min-h-screen overflow-auto')}>
			<HomeWithSession />
		</main>
	);
}
