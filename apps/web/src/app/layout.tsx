import fonts from "@/lib/fonts";
import Logo from "@workspace/design-system/components/Logo";
import "@workspace/design-system/globals.css";
import "./style.css";
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
        className={`${fonts.GeistSans.variable} ${fonts.GeistSans.variable} bg-muted font-sans antialiased`}
      >
        <header className="border-b py-5">
          <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 md:px-0">
            <div className="flex items-center gap-5">
              <Link href={"/"} className="inline-block">
                <Logo />
              </Link>

              <Link href={"/new-prescription"} className="hover:underline">
                New Prescription
              </Link>

              <Link href={"/create-template"} className="hover:underline">
                Create Template
              </Link>
            </div>

            <div>
              <Link href="https://github.com/StepAsideLiL/print-med-prescription">
                <Icons.Github size={40} />
              </Link>
            </div>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
