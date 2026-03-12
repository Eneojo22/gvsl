import type { Metadata } from "next";

import AirportMeetAndGreetPage from "./airportmeetandgreet";

export const metadata: Metadata = {
  title: "Airport Meet and Greet | G&V Support Services",
  description:
    "Professional airport meet and greet support for arrivals into Nigeria, including reception, arrival coordination, and onward transfer assistance.",
};

export default function Page() {
  return <AirportMeetAndGreetPage />;
}
