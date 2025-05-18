import fonts from "@/lib/fonts";
import "@workspace/design-system/globals.css";
import "./style.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fonts.GeistSans.variable} ${fonts.GeistSans.variable} bg-muted font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
