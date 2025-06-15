import Logo from "@workspace/design-system/components/Logo";
import Icons from "@workspace/design-system/icons";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b py-5">
        <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 md:px-0">
          <div className="flex items-center gap-5">
            <Link href={"/"} className="inline-block">
              <Logo />
            </Link>

            <Link href={"/new-prescription"} className="hover:underline">
              New Prescription
            </Link>

            <Link href={"/templates"} className="hover:underline">
              Templates
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

      <footer className="bg-background border-t">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 md:px-0">
          <div className="text-muted-foreground text-sm">
            © 2025 - {new Date().getFullYear()} Print Medicine Prescription
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/StepAsideLiL"
              className="hover:underline"
            >
              GitHub
            </Link>
            <Link href="https://x.com/StepAsideLiL" className="hover:underline">
              X
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
