import { clientProfile } from "@/lib/config/clientProfile";
import { Estimate } from "@/lib/domain/types";
import { FlowData } from "@/components/estimator/EstimatorFlow";

export function SummaryStep({ data, estimate }: { data: FlowData; estimate: Estimate }) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold">Your instant rough estimate</h2>
      <p className="mt-2">{data.property?.formattedAddress}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg bg-slate-100 p-3"><p className="text-sm text-slate-500">Estimated area</p><p className="font-semibold">{data.squareFeet.toLocaleString()} sq ft</p></div>
        <div className="rounded-lg bg-slate-100 p-3"><p className="text-sm text-slate-500">Preliminary range</p><p className="font-semibold">${Math.round(estimate.low).toLocaleString()} - ${Math.round(estimate.high).toLocaleString()}</p></div>
        <div className="rounded-lg bg-slate-100 p-3"><p className="text-sm text-slate-500">Reference ID</p><p className="font-semibold">{data.leadId}</p></div>
      </div>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
        {estimate.assumptions.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <p className="mt-4 rounded-lg bg-brand-light p-3 text-sm text-brand-dark">{clientProfile.legal.disclaimer}</p>
      <p className="mt-4 text-sm">Next steps: Our team and AI assistant will follow up to confirm details and help schedule a site verification appointment.</p>
    </section>
  );
}
