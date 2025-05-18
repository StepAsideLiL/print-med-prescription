import Logo from "@workspace/design-system/components/Logo";
import { Icons } from "@workspace/design-system/icons";
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
    </>
  );
}
