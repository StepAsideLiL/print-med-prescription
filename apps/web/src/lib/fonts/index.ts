import { Geist, Geist_Mono } from "next/font/google";

const GeistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const GeistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fonts = {
  GeistSans,
  GeistMono,
};

export default fonts;
