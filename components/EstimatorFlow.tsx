"use client";

import { useMemo, useState } from "react";
import { pilotClientConfig } from "@/lib/config/pilotClient";
import { mockLead, mockMeasurement, mockTier } from "@/lib/mock/estimatorData";

type LeadForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
};

const steps = ["Project", "Measurement", "Package", "Contact", "Review"];

export function EstimatorFlow() {
  const [step, setStep] = useState(0);
  const [squareFeet, setSquareFeet] = useState<number>(mockMeasurement.squareFeet);
  const [tierId, setTierId] = useState(mockTier.id);
  const [lead, setLead] = useState<LeadForm>(mockLead);
  const [status, setStatus] = useState<string>("");

  const selectedTier = pilotClientConfig.pricingTiers.find((tier) => tier.id === tierId) ?? pilotClientConfig.pricingTiers[0];

  const estimate = useMemo(() => {
    const base = squareFeet * selectedTier.ratePerSqFt;
    return {
      min: Math.round(base * 0.92),
      max: Math.round(base * 1.12)
    };
  }, [selectedTier.ratePerSqFt, squareFeet]);

  const progress = ((step + 1) / steps.length) * 100;

  const canContinue =
    step !== 3 ||
    (lead.fullName.trim() && lead.email.trim() && lead.phone.trim() && lead.address.trim() && lead.city.trim());

  const submitLead = async () => {
    setStatus("Submitting...");
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        estimate: {
          tierId: selectedTier.id,
          tierLabel: selectedTier.label,
          squareFeet,
          estimateMin: estimate.min,
          estimateMax: estimate.max
        }
      })
    });

    if (res.ok) {
      setStatus("Lead submitted. Demo integrations logged in development mode.");
      return;
    }

    setStatus("Submission failed. Please retry.");
  };

  return (
    <div className="container">
      <div className="step-header">
        <div>
          <h1>{pilotClientConfig.businessName}</h1>
          <p className="small">Instant Turf Estimator Demo</p>
        </div>
        <span className="badge">{pilotClientConfig.logoPlaceholder}</span>
      </div>

      <p className="small" style={{ marginBottom: "0.75rem" }}>
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>
      <div className="progress-track" aria-label="Estimator progress">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <section style={{ marginTop: "1rem" }}>
        {step === 0 && (
          <div className="grid two">
            <article className="card">
              <h3>Service Area</h3>
              <p className="small">{pilotClientConfig.serviceArea.join(" • ")}</p>
            </article>
            <article className="card">
              <h3>Demo-Ready Defaults</h3>
              <p className="small">Pre-filled mock data is loaded for quick presentations.</p>
            </article>
          </div>
        )}

        {step === 1 && (
          <div className="grid">
            <div className="field">
              <label htmlFor="sqft">Estimated project area (sq ft)</label>
              <input
                id="sqft"
                type="number"
                min={100}
                value={squareFeet}
                onChange={(e) => setSquareFeet(Number(e.target.value))}
              />
            </div>
            <article className="card">
              <h3>AI Auto-Detect Area</h3>
              <p className="small">Coming soon — we plan to support map/photo-based area detection in a future release.</p>
            </article>
          </div>
        )}

        {step === 2 && (
          <div className="grid">
            <div className="field">
              <label htmlFor="tier">Pricing tier</label>
              <select id="tier" value={tierId} onChange={(e) => setTierId(e.target.value)}>
                {pilotClientConfig.pricingTiers.map((tier) => (
                  <option key={tier.id} value={tier.id}>
                    {tier.label} — ${tier.ratePerSqFt}/sq ft
                  </option>
                ))}
              </select>
            </div>
            <article className="card">
              <h3>{selectedTier.label}</h3>
              <p className="small">{selectedTier.description}</p>
              <p style={{ marginTop: "0.5rem" }}>
                Estimated range: <strong>${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}</strong>
              </p>
            </article>
          </div>
        )}

        {step === 3 && (
          <div className="grid two">
            {Object.entries(lead).map(([key, value]) => (
              <div className="field" key={key} style={key === "notes" ? { gridColumn: "1 / -1" } : undefined}>
                <label htmlFor={key}>{key}</label>
                {key === "notes" ? (
                  <textarea
                    id={key}
                    rows={3}
                    value={value}
                    onChange={(e) => setLead((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                ) : (
                  <input
                    id={key}
                    value={value}
                    onChange={(e) => setLead((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="grid">
            <article className="card">
              <h3>Ready to Submit</h3>
              <p className="small">{lead.fullName} • {lead.phone} • {lead.city}</p>
              <p style={{ marginTop: "0.5rem" }}>
                {selectedTier.label} for {squareFeet} sq ft: <strong>${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}</strong>
              </p>
            </article>
            <p className="small">{pilotClientConfig.disclaimerCopy}</p>
            <button onClick={submitLead}>Submit Lead</button>
            {status ? <p className="small">{status}</p> : null}
          </div>
        )}
      </section>

      <div className="actions">
        <button className="secondary" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          Back
        </button>
        <button disabled={step === steps.length - 1 || !canContinue} onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>
          Continue
        </button>
      </div>
    </div>
  );
}
