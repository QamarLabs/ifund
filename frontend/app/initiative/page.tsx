import Initiative from "@/components/Dashboard/Initiative";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IslamFund | Initiative Page",
  description: "This is Initiative Page for TailAdmin Next.js",
  // other metadata
};

export default function InitiativePage() {
  return (
    <>
      <Initiative />
    </>
  );
}
