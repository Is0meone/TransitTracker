'use client'

import { Suspense } from "react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/app/components/MapComponent"), {
  ssr: false,
});

export default function MapPage() {
  return(
    <Suspense fallback={<div>Ładowanie mapy...</div>}>
      <MapComponent />
    </Suspense>
  )
}
