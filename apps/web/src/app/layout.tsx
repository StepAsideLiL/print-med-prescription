import fonts from "@/lib/fonts";
import Logo from "@workspace/design-system/components/Logo";
import "@workspace/design-system/globals.css";
import { Icons } from "@workspace/design-system/icons";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fonts.GeistSans.variable} ${fonts.GeistSans.variable} font-sans antialiased`}
      >
        <header className="border-b py-5">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 md:px-0">
            <Link href={"/"} className="inline-block">
              <Logo />
            </Link>

            <div>
              <Link href="https://github.com/StepAsideLiL/print-med-prescription">
                <Icons.Github size={40} />
              </Link>
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
