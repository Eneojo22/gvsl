import type { Metadata } from "next";

import DeparturePage from "./departure";

export const metadata: Metadata = {
  title: "Departure Services | G&V Support Services",
  description:
    "Professional departure support for assignees leaving Nigeria, including lease exit coordination, property handover, and move-out close-out services.",
};

export default function Page() {
  return <DeparturePage />;
}
