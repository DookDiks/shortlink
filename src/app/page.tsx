import HomePage from "@/containers/home/HomePage";
import { cn } from "@dookdiks/utils";

export default function Home() {
	return (
		<main className={cn('bg-primary overflow-auto')}>
			<HomePage />
		</main>
	);
}
