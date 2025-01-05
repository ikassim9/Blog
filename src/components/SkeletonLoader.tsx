import React from 'react';

export default function SkeletonLoader() {
  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
    </>
  );
}
