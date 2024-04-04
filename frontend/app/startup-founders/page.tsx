import StartupFounders from "@/components/Dashboard/StartupFounders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IslamFund | Startup Founder Page",
  description: "This is Startup Founder Page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {
  return (
    <>
      <StartupFounders />
    </>
  );
}
