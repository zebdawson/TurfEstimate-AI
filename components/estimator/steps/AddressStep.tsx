"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Property } from "@/lib/domain/types";
import { Button } from "@/components/ui/Button";
import { useGoogleMaps } from "@/lib/services/useGoogleMaps";

export function AddressStep({ onNext }: { onNext: (property: Property) => void }) {
  const [property, setProperty] = useState<Property | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const loaded = useGoogleMaps();

  useEffect(() => {
    if (!loaded || !inputRef.current) {
      return;
    }

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ["formatted_address", "geometry", "address_components"]
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry?.location || !place.formatted_address) {
        return;
      }
      const components = place.address_components ?? [];
      const getPart = (type: string) => components.find((c) => c.types.includes(type))?.long_name;
      setProperty({
        formattedAddress: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        city: getPart("locality"),
        state: getPart("administrative_area_level_1"),
        zip: getPart("postal_code")
      });
    });
  }, [loaded]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (property) {
      onNext(property);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-xl bg-white p-5 shadow-sm md:p-8">
      <h1 className="text-2xl font-bold">Start with your property address</h1>
      <p className="mt-2 text-slate-600">We use satellite imagery so you can confirm your turf area before requesting a call.</p>

      <div className="mt-6 space-y-3">
        <input ref={inputRef} className="w-full rounded-lg border border-slate-300 p-3" placeholder="123 Main St, City, State" name="address" />
        {!loaded && <p className="rounded-lg bg-slate-100 p-3 text-sm">Loading map services...</p>}
        {property && <div className="rounded-lg bg-brand-light p-3 text-sm text-brand-dark">Confirmed: {property.formattedAddress}</div>}
      </div>

      <Button className="mt-6" disabled={!property} type="submit">Continue to Measurement</Button>
    </form>
  );
}
