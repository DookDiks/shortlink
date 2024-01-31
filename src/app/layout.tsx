import type { Metadata } from "next";
import "../styles/globals.css";
import { cn } from "@dookdiks/utils";

import localFont from "next/font/local";

export const metadata: Metadata = {
	title: "DookDiks - Shorten links",
	description:
		"This web application is used to shorten links. It is built with Next.js and TailwindCSS.",
};

const maiTree = localFont({
	src: [
		{
			path: "../styles/fonts/Maitree/Maitree-Light.ttf",
			weight: "100",
		},
		{
			path: "../styles/fonts/Maitree/Maitree-Light.ttf",
			weight: "200",
		},
		{
			path: "../styles/fonts/Maitree/Maitree-Medium.ttf",
			weight: "300",
		},
		{
			path: "../styles/fonts/Maitree/Maitree-Regular.ttf",
			weight: "400",
		},
		{
			path: "../styles/fonts/Maitree/Maitree-SemiBold.ttf",
			weight: "500",
		},
		{
			path: "../styles/fonts/Maitree/Maitree-Bold.ttf",
			weight: "600",
		},
	],
	variable: "--font-maitree",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={cn(maiTree.className, "bg-primary")}>
			<body>{children}</body>
		</html>
	);
}
