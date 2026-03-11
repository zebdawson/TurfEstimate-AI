"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { FlowData } from "@/components/estimator/EstimatorFlow";
import { Property, ProductTier } from "@/lib/domain/types";
import { computeTotalSqFt } from "@/lib/services/geometry";
import { useGoogleMaps } from "@/lib/services/useGoogleMaps";

export function MeasureStep({
  property,
  data,
  onBack,
  onUpdate,
  onContinue
}: {
  property: Property;
  data: FlowData;
  onBack: () => void;
  onUpdate: (data: Partial<FlowData>) => void;
  onContinue: () => void;
}) {
  const loaded = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const drawingManager = useRef<google.maps.drawing.DrawingManager | null>(null);
  const polygonInstances = useRef<google.maps.Polygon[]>([]);

  useEffect(() => {
    if (!loaded || !mapRef.current || mapInstance.current) {
      return;
    }

    mapInstance.current = new google.maps.Map(mapRef.current, {
      center: { lat: property.lat, lng: property.lng },
      zoom: 20,
      mapTypeId: "satellite",
      streetViewControl: false,
      fullscreenControl: false
    });

    drawingManager.current = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: { drawingModes: [google.maps.drawing.OverlayType.POLYGON] },
      polygonOptions: { editable: true, fillColor: "#0A7E4F", fillOpacity: 0.35, strokeColor: "#0A7E4F" }
    });

    drawingManager.current.setMap(mapInstance.current);
    drawingManager.current.addListener("polygoncomplete", (poly: google.maps.Polygon) => {
      const path = poly.getPath().getArray().map((p) => ({ lat: p.lat(), lng: p.lng() }));
      onUpdate({ polygons: [...data.polygons, path], squareFeet: Math.round(computeTotalSqFt([...data.polygons, path])) });
      poly.setMap(null);
    });
  }, [loaded, property.lat, property.lng, data.polygons, onUpdate]);

  useEffect(() => {
    if (!mapInstance.current) {
      return;
    }
    polygonInstances.current.forEach((poly) => poly.setMap(null));
    polygonInstances.current = data.polygons.map((path, idx) => {
      const poly = new google.maps.Polygon({
        paths: path,
        editable: true,
        map: mapInstance.current!,
        fillColor: "#0A7E4F",
        fillOpacity: 0.35,
        strokeColor: "#0A7E4F"
      });

      const sync = () => {
        const nextPolygons = polygonInstances.current.map((instance) =>
          instance.getPath().getArray().map((p) => ({ lat: p.lat(), lng: p.lng() }))
        );
        onUpdate({ polygons: nextPolygons, squareFeet: Math.round(computeTotalSqFt(nextPolygons)) });
      };
      poly.getPath().addListener("insert_at", sync);
      poly.getPath().addListener("set_at", sync);
      poly.getPath().addListener("remove_at", sync);
      poly.addListener("rightclick", () => {
        const filtered = data.polygons.filter((_, i) => i !== idx);
        onUpdate({ polygons: filtered, squareFeet: Math.round(computeTotalSqFt(filtered)) });
      });
      return poly;
    });
  }, [data.polygons, onUpdate]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <section className="rounded-xl bg-white p-5 shadow-sm md:col-span-2">
        <h2 className="text-xl font-semibold">Draw your turf area</h2>
        <p className="mb-3 text-sm text-slate-600">Use polygon tool, drag points to edit, or right-click an area to remove it.</p>
        <div ref={mapRef} className="h-[460px] w-full rounded-lg bg-slate-100" />
      </section>
      <aside className="rounded-xl bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Measured area</p>
        <p className="text-3xl font-bold">{data.squareFeet.toLocaleString()} sq ft</p>
        <label className="mt-4 block text-sm font-semibold">Product tier</label>
        <select className="mt-1 w-full rounded-lg border border-slate-300 p-2" value={data.productTier} onChange={(e) => onUpdate({ productTier: e.target.value as ProductTier })}>
          <option value="value">Value Turf</option>
          <option value="premium">Premium Turf</option>
          <option value="pet">Pet + Drainage Turf</option>
        </select>

        <div className="mt-4 space-y-2 text-sm">
          {["edging", "haulAway", "irrigationCap"].map((key) => (
            <label key={key} className="flex items-center gap-2">
              <input type="checkbox" checked={data.addOns.includes(key)} onChange={(e) => onUpdate({ addOns: e.target.checked ? [...data.addOns, key] : data.addOns.filter((item) => item !== key) })} />
              {key}
            </label>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          <Button type="button" className="bg-slate-200 text-slate-900 hover:bg-slate-300" onClick={onBack}>Back</Button>
          <Button type="button" disabled={data.squareFeet < 1} onClick={onContinue}>Continue</Button>
        </div>
      </aside>
    </div>
  );
}
