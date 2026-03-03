import "./globals.css";

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
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}