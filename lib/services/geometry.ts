export function computePolygonSqFt(points: google.maps.LatLngLiteral[]): number {
  if (typeof google === "undefined" || !google.maps.geometry || points.length < 3) {
    return 0;
  }
  const path = points.map((p) => new google.maps.LatLng(p.lat, p.lng));
  const squareMeters = google.maps.geometry.spherical.computeArea(path);
  return squareMeters * 10.7639;
}

export function computeTotalSqFt(polygons: google.maps.LatLngLiteral[][]): number {
  return polygons.reduce((sum, poly) => sum + computePolygonSqFt(poly), 0);
}
