import { NextResponse } from "next/server";

export async function GET() {
  const stats = [
    { value: "300+", label: "Relocations completed", description: "Supporting families and executives across Nigeria." },
    { value: "10+", label: "Years of experience", description: "Delivering dependable support since day one." },
    { value: "98%", label: "Customer satisfaction", description: "Trusted by clients for consistent, people-first service." },
    { value: "6+", label: "Cities covered", description: "Active presence across Nigeria’s major hubs." },
    { value: "15+", label: "Team members", description: "Experienced local specialists working together for you." },
    { value: "< 24h", label: "Avg response time", description: "Fast answers when you need them most." },
  ];

  return NextResponse.json(stats, { status: 200 });
}
