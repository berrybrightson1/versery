import { Inter, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

import { LiturgyAudio } from "@/components/LiturgyAudio";
import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${inter.className} font-sans leading-relaxed text-nova-text antialiased`}
      >
        <LiturgyAudio />
        <div className="flex min-h-screen bg-nova-offwhite overflow-x-hidden md:pl-[280px]">
          <Sidebar />
          <main className="flex-1 flex flex-col min-h-screen relative p-4 md:p-8">
            <div className="flex-1 max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}


