"use client";

import { useCallback, useMemo, useState } from "react";
import { estimateSchema, leadSchema } from "@/lib/services/validation";
import { calculateEstimate } from "@/lib/services/pricingEngine";
import { ProductTier, Property } from "@/lib/domain/types";
import { AddressStep } from "@/components/estimator/steps/AddressStep";
import { MeasureStep } from "@/components/estimator/steps/MeasureStep";
import { LeadStep } from "@/components/estimator/steps/LeadStep";
import { SummaryStep } from "@/components/estimator/steps/SummaryStep";

export type FlowData = {
  property?: Property;
  polygons: google.maps.LatLngLiteral[][];
  squareFeet: number;
  productTier: ProductTier;
  addOns: string[];
  lead?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    notes?: string;
  };
  leadId?: string;
};

const STEPS = ["Address", "Measure", "Contact", "Summary"];

export function EstimatorFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FlowData>({ polygons: [], squareFeet: 0, productTier: "premium", addOns: [] });
  const estimate = useMemo(() => calculateEstimate(data.squareFeet, data.productTier, data.addOns), [data]);
  const updateData = useCallback((update: Partial<FlowData>) => {
    setData((prev) => ({ ...prev, ...update }));
  }, []);

  const persistLead = async (leadInput: NonNullable<FlowData["lead"]>) => {
    const payload = {
      ...leadInput,
      property: data.property,
      measurement: { polygons: data.polygons, squareFeet: data.squareFeet, customerConfirmed: true },
      estimate
    };

    const validated = leadSchema.and(estimateSchema).parse(payload);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated)
    });
    if (!response.ok) {
      throw new Error("Unable to submit lead.");
    }
    const json = await response.json();
    setData((prev) => ({ ...prev, leadId: json.id }));
    setStep(3);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <div className="mb-5 flex gap-2">
        {STEPS.map((label, idx) => (
          <div key={label} className={`rounded-full px-3 py-1 text-sm ${idx <= step ? "bg-brand text-white" : "bg-slate-200"}`}>
            {label}
          </div>
        ))}
      </div>

      {step === 0 && <AddressStep onNext={(property) => { setData((prev) => ({ ...prev, property })); setStep(1); }} />}
      {step === 1 && data.property && (
        <MeasureStep
          property={data.property}
          data={data}
          onBack={() => setStep(0)}
          onUpdate={updateData}
          onContinue={() => setStep(2)}
        />
      )}
      {step === 2 && data.property && (
        <LeadStep
          property={data.property}
          estimate={estimate}
          onBack={() => setStep(1)}
          onSubmit={(lead) => {
            setData((prev) => ({ ...prev, lead }));
            void persistLead(lead);
          }}
        />
      )}
      {step === 3 && data.property && data.lead && <SummaryStep data={data} estimate={estimate} />}
    </div>
  );
}
