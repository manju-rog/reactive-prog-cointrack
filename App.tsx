
import React, { useState, useEffect, useMemo } from 'react';
import { Coin } from './types';
import { useCoinData } from './hooks/useCoinData';
import Header from './components/Header';
import CoinList from './components/CoinList';
import SkeletonLoader from './components/SkeletonLoader';
import { DisconnectedIcon } from './components/icons';

const App: React.FC = () => {
  const [isLive, setIsLive] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  const { coins, error, isLoading } = useCoinData(isLive);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredCoins = useMemo(() => {
    if (!coins) return [];
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [coins, debouncedSearchTerm]);

  const renderContent = () => {
    if (isLoading && coins.length === 0) {
      return <SkeletonLoader />;
    }
    
    if (error) {
      return (
        <div className="text-center text-red-400 p-10 bg-red-500/10 rounded-lg max-w-md mx-auto mt-10 flex flex-col items-center">
          <DisconnectedIcon className="w-16 h-16 mb-4"/>
          <h2 className="text-2xl font-bold mb-2">Connection Lost</h2>
          <p className="text-red-300">Could not fetch live data. We'll keep trying in the background.</p>
          <p className="text-xs mt-4 text-gray-500">{error.message}</p>
        </div>
      );
    }

    if (filteredCoins.length === 0 && !isLoading) {
       return (
        <div className="text-center text-gray-400 p-10">
          <h2 className="text-2xl font-bold">No results found</h2>
          <p>Try adjusting your search term.</p>
        </div>
      );
    }
    
    return <CoinList coins={filteredCoins} />;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <Header
          isLive={isLive}
          onToggleLive={() => setIsLive(prev => !prev)}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
        />
        <main className="mt-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
