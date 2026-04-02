import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"]});

export const metadata: Metadata = {
    title: "turfr",
    description: "Join your turf match in seconds. No apps. Just the link.",
};

export default function RootLayout({
   children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" className="h-full dark">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className={`${inter.className} h-full`}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}