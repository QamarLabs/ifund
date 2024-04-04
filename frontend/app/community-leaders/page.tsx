import CommunityLeaders from "@/components/Dashboard/CommunityLeaders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IslamFund | Community Leader Page",
  description: "This is Community Leader Page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {
  return (
    <>
      <CommunityLeaders />
    </>
  );
}
