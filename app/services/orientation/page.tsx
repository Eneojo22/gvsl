import type { Metadata } from "next";

import OrientationPage from "./orientaion";

export const metadata: Metadata = {
  title: "Orientation and Area Tours | G&V Support Services",
  description:
    "Structured orientation and area tour support to help relocating clients understand neighborhoods, housing, schools, and everyday life in Nigeria.",
};

export default function Page() {
  return <OrientationPage />;
}
