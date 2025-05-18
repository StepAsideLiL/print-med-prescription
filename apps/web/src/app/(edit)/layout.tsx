import Logo from "@workspace/design-system/components/Logo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b py-3">
        <Logo />
      </header>

      {children}
    </>
  );
}
