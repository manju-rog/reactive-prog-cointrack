
import React from 'react';

const SkeletonRow: React.FC = () => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 items-center p-4">
    <div className="col-span-2 sm:col-span-2 md:col-span-2 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-700"></div>
      <div>
        <div className="h-4 bg-gray-700 rounded w-24 mb-1"></div>
        <div className="h-3 bg-gray-700 rounded w-16"></div>
      </div>
    </div>
    <div className="text-right">
      <div className="h-4 bg-gray-700 rounded w-20 ml-auto"></div>
    </div>
    <div className="hidden sm:block text-right">
      <div className="h-4 bg-gray-700 rounded w-12 ml-auto"></div>
    </div>
    <div className="hidden md:block text-right">
      <div className="h-4 bg-gray-700 rounded w-10 ml-auto"></div>
    </div>
  </div>
);

const SkeletonLoader: React.FC = () => {
  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg overflow-hidden animate-pulse">
       <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 text-xs sm:text-sm font-bold text-gray-400 p-4 border-b border-gray-700">
        <div className="col-span-2 sm:col-span-2 md:col-span-2"><div className="h-4 bg-gray-700 rounded w-12"></div></div>
        <div className="text-right"><div className="h-4 bg-gray-700 rounded w-10 ml-auto"></div></div>
        <div className="hidden sm:block text-right"><div className="h-4 bg-gray-700 rounded w-20 ml-auto"></div></div>
        <div className="hidden md:block text-right"><div className="h-4 bg-gray-700 rounded w-12 ml-auto"></div></div>
      </div>
      <div className="divide-y divide-gray-700/50">
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonRow key={index} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
