"use client";

import { useEffect, useState } from "react";

let loaderPromise: Promise<void> | null = null;

export function useGoogleMaps() {
  const [loaded, setLoaded] = useState(typeof window !== "undefined" && !!window.google?.maps);

  useEffect(() => {
    if (loaded) {
      return;
    }

    if (!loaderPromise) {
      loaderPromise = new Promise<void>((resolve, reject) => {
        const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!key) {
          reject(new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"));
          return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places,drawing,geometry`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Google Maps failed to load"));
        document.head.appendChild(script);
      });
    }

    loaderPromise.then(() => setLoaded(true)).catch(() => setLoaded(false));
  }, [loaded]);

  return loaded;
}
