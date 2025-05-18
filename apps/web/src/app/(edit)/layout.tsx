import Logo from "@workspace/design-system/components/Logo";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b py-3">
        <Link href={"/"}>
          <Logo />
        </Link>
      </header>

      {children}
    </>
  );
}
