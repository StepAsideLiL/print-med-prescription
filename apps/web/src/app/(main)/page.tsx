import { Button } from "@workspace/design-system/ui/button";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-2 px-5 py-5 md:px-0">
      <div className="flex w-full justify-between">
        <div className="w-full space-y-2">
          <h1 className="text-balance text-5xl font-semibold">
            Print Medicine Prescription
          </h1>

          <p className="text-balance">
            This app helps doctor to print medicine prescription easily with
            their own template.
          </p>

          <div className="flex items-center gap-2">
            <Button className="cursor-pointer">New Prescription</Button>
            <Button variant={"outline"} className="cursor-pointer">
              Templates
            </Button>
          </div>
        </div>

        <div className="flex w-full justify-end">
          <Image
            src={"/hero.webp"}
            alt="Print Med Prescription"
            width={400}
            height={400}
          />
        </div>
      </div>
    </main>
  );
}
