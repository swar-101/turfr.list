import "./globals.css";
import { Inter } from "next/font/google";
import { IBM_Plex_Sans } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"]});

const plex = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["400","500","600"]
});

export const metadata = {
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
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
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