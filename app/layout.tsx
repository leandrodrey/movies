import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "@/app/ProviderWrapper";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Mi Netflix",
    description: "Powered by Next.js and Tailwind CSS",
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ProviderWrapper>
                    <Header />
                        {children}
                    <Footer />
                </ProviderWrapper>
            </body>
        </html>
    );
}
