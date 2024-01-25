import type { Metadata } from "next";
import { Noto_Sans_Thai, Outfit, Sarabun } from "next/font/google";
import "../styles/globals.scss";
import { cn } from "@dookdiks/utils";

export const metadata: Metadata = {
	title: "DookDiks - Shorten links",
	description:
		"This web application is used to shorten links. It is built with Next.js and TailwindCSS.",
};

const notoSansThai = Noto_Sans_Thai({
	subsets: ["latin", "thai"],
	display: "auto",
	variable: "--font-noto-sans-thai",
});

const outfit = Outfit({
	subsets: ["latin", "latin-ext"],
	display: "auto",
	variable: "--font-outfit",
});

const sarabun = Sarabun({
	weight: "400",
	subsets: ["latin", "latin-ext", "thai"],
	display: "auto",
	variable: "--font-sarabun",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={cn(
				notoSansThai.className,
				outfit.className,
				sarabun.className
			)}
		>
			<body>{children}</body>
		</html>
	);
}
