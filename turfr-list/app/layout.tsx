import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"]});
export const metadata = {
    title: "Turfr List",
    description: "Match participation and payment tracker for Turfr",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full">
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
                rel="stylesheet"
            />
        </head>

        <body className={`${inter.className} h-full overflow-hidden`}>
        {children}
        <Toaster />
        </body>
        </html>
    );
}