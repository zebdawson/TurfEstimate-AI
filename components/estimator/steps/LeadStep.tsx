"use client";

import { FormEvent, useState } from "react";
import { Estimate, Property } from "@/lib/domain/types";
import { Button } from "@/components/ui/Button";

export function LeadStep({
  property,
  estimate,
  onBack,
  onSubmit
}: {
  property: Property;
  estimate: Estimate;
  onBack: () => void;
  onSubmit: (lead: { firstName: string; lastName: string; phone: string; email: string; notes?: string }) => void;
}) {
  const [lead, setLead] = useState({ firstName: "", lastName: "", phone: "", email: "", notes: "" });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(lead);
  };

  return (
    <form onSubmit={submit} className="rounded-xl bg-white p-5 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold">Get your preliminary estimate summary</h2>
      <p className="mt-1 text-sm text-slate-600">{property.formattedAddress}</p>
      <p className="mt-2 font-semibold text-brand">${Math.round(estimate.low).toLocaleString()} - ${Math.round(estimate.high).toLocaleString()}</p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {[
          ["firstName", "First name", "text"],
          ["lastName", "Last name", "text"],
          ["phone", "Phone", "tel"],
          ["email", "Email", "email"]
        ].map(([key, label, type]) => (
          <input
            key={key}
            required
            type={type}
            placeholder={label}
            className="rounded-lg border border-slate-300 p-3"
            value={lead[key as keyof typeof lead]}
            onChange={(e) => setLead((prev) => ({ ...prev, [key]: e.target.value }))}
          />
        ))}
      </div>
      <textarea
        placeholder="Project notes (optional)"
        className="mt-3 w-full rounded-lg border border-slate-300 p-3"
        value={lead.notes}
        onChange={(e) => setLead((prev) => ({ ...prev, notes: e.target.value }))}
      />

      <div className="mt-5 flex gap-2">
        <Button type="button" className="bg-slate-200 text-slate-900 hover:bg-slate-300" onClick={onBack}>Back</Button>
        <Button type="submit">Submit & Continue</Button>
      </div>
    </form>
  );
}
