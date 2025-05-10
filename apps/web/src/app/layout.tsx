import fonts from "@/lib/fonts";
import "@workspace/ui/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fonts.GeistSans.variable} ${fonts.GeistSans.variable} font-sans antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
