import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "DookDiks - Shorten links",
	description:
		"This web application is used to shorten links. It is built with Next.js and TailwindCSS.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
