import Startup from "@/components/Dashboard/Startup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IslamFund | Startup Page",
  description: "This is Startup Page for TailAdmin Next.js",
  // other metadata
};

export default function StartupPage() {
  return (
    <>
      <Startup />
    </>
  );
}
