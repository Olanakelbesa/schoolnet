"use client";

import { Suspense } from "react";
import SearchResultsContent from "@/app/components/ParentDashboard/SearchResultsContent";

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}