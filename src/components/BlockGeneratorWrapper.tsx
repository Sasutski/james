'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// This dynamic import needs to be inside a client component
const BlockGenerator = dynamic(() => import('./BlockGenerator'), {
  ssr: false,
  loading: () => <LoadingPlaceholder />
});

const LoadingPlaceholder = () => (
  <div className="w-full h-full bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
    <span className="text-gray-400">Loading interactive blocks...</span>
  </div>
);

export default function BlockGeneratorWrapper() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Suspense fallback={<LoadingPlaceholder />}>
        <BlockGenerator />
      </Suspense>
    </div>
  );
}