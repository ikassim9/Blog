import React from 'react';

export default function Spinner() {
  return (
    <>
    <div className="flex items-center justify-center fixed inset-0">
      <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
    </>
  );
}
