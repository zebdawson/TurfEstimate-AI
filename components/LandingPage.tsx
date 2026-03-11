import Link from "next/link";
import { clientProfile } from "@/lib/config/clientProfile";
import { Button } from "@/components/ui/Button";

export function LandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-14">
      <section className="rounded-2xl bg-white p-6 shadow-sm md:p-12">
        <p className="mb-3 inline-flex rounded-full bg-brand-light px-3 py-1 text-sm font-semibold text-brand-dark">
          Instant rough estimate • No on-site visit required to start
        </p>
        <h1 className="text-3xl font-bold md:text-5xl">{clientProfile.brand.heroHeadline}</h1>
        <p className="mt-4 max-w-3xl text-slate-600 md:text-lg">{clientProfile.brand.heroSubhead}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/estimate">
            <Button>Start Free Estimate</Button>
          </Link>
          <a className="rounded-lg border border-slate-300 px-5 py-3 font-semibold" href={`tel:${clientProfile.brand.phone}`}>
            Call {clientProfile.brand.phone}
          </a>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["1. Confirm address", "Use Google-powered autocomplete to find your property."],
          ["2. Draw turf area", "Outline the project in satellite view and edit as needed."],
          ["3. Get estimate", "View a preliminary estimate range and book next steps."]
        ].map(([title, copy]) => (
          <article key={title} className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{copy}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl bg-slate-900 p-6 text-white md:p-10">
        <h3 className="text-2xl font-bold">Trusted preliminary pricing, then site-verified final quote.</h3>
        <p className="mt-3 max-w-3xl text-slate-200">{clientProfile.legal.disclaimer}</p>
      </section>
    </main>
  );
}
