import Link from "next/link";

type Props = {
  params: { slug?: string[] };
};

export default function AboutUsCatchAll({ params }: Props) {
  const path = params.slug?.join("/") ?? "";

  return (
    <div className="min-h-screen bg-yellow-200 px-4 py-16 text-black">
      <div className="mx-auto max-w-3xl rounded-2xl border border-yellow-300 bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-700">
          The path <span className="font-semibold">{path || "(root)"}</span> does not match a valid About Us page.
        </p>

        <div className="mt-8 space-y-4">
          <p className="font-semibold">Try one of these pages:</p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/aboutUs/Testimonials"
                className="inline-flex items-center gap-2 rounded-full bg-[#dd5500] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c54800]"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                href="/aboutUs/Event"
                className="inline-flex items-center gap-2 rounded-full bg-[#dd5500] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c54800]"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/aboutUs"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                About Us Home
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-10 text-sm text-slate-600">
          <p>
            If you believe this is an error, please check the URL or navigate using the links above.
          </p>
        </div>
      </div>
    </div>
  );
}
