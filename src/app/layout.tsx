import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shutterscape | Photography club, Girijananda Chowdhury University",
  description:
    "The photography club of Girijananda Chowdhury University. We photograph the strange, the soft and the ordinary until they look back.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f3ecdc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Gloock&family=Syne:wght@400;600;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
