
import React, { useRef, useEffect } from 'react';
import { Coin } from '../types';
import CoinRow from './CoinRow';

interface CoinListProps {
  coins: Coin[];
}

const CoinList: React.FC<CoinListProps> = ({ coins }) => {
  const lastPricesRef = useRef<Map<string, number>>(new Map());

  // Use a layout effect to capture the prices from the *previous* render.
  // This ensures that when a new render happens with new prices, the CoinRow
  // components receive the old price for comparison.
  useEffect(() => {
    coins.forEach(coin => {
      lastPricesRef.current.set(coin.symbol, coin.price);
    });
  });

  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 text-xs sm:text-sm font-bold text-gray-400 p-4 border-b border-gray-700">
        <div className="col-span-2 sm:col-span-2 md:col-span-2">NAME</div>
        <div className="text-right">PRICE</div>
        <div className="hidden sm:block text-right">24H CHANGE</div>
        <div className="hidden md:block text-right">SYMBOL</div>
      </div>
      <div className="divide-y divide-gray-700/50">
        {coins.map((coin) => (
          <CoinRow
            key={coin.id}
            coin={coin}
            lastPrice={lastPricesRef.current.get(coin.symbol)}
          />
        ))}
      </div>
    </div>
  );
};

export default CoinList;
