
import React, { useState, useEffect } from 'react';
import { Coin } from '../types';
import { ArrowUpIcon, ArrowDownIcon } from './icons';

interface CoinRowProps {
  coin: Coin;
  lastPrice?: number;
}

const CoinRow: React.FC<CoinRowProps> = ({ coin, lastPrice }) => {
  const [priceChange, setPriceChange] = useState<'up' | 'down' | 'none'>('none');

  useEffect(() => {
    if (lastPrice !== undefined && lastPrice !== coin.price) {
      if (coin.price > lastPrice) {
        setPriceChange('up');
      } else {
        setPriceChange('down');
      }

      const timer = setTimeout(() => {
        setPriceChange('none');
      }, 1500); // The flash will fade out over 1.5s

      return () => clearTimeout(timer);
    }
  }, [coin.price, lastPrice]);

  const priceColorClass = 
    priceChange === 'up' ? 'text-emerald-400' :
    priceChange === 'down' ? 'text-red-400' :
    'text-gray-100';

  const bgColorClass = 
    priceChange === 'up' ? 'bg-emerald-500/20' :
    priceChange === 'down' ? 'bg-red-500/20' :
    'bg-transparent';

  const priceChangePercent = lastPrice ? ((coin.price - lastPrice) / lastPrice) * 100 : 0;

  return (
    <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 items-center p-4 transition-colors duration-1000 ${bgColorClass}`}>
      <div className="col-span-2 sm:col-span-2 md:col-span-2 flex items-center gap-3">
        <img src={`https://picsum.photos/seed/${coin.id}/32`} alt={coin.name} className="w-8 h-8 rounded-full" />
        <div>
          <div className="font-bold text-gray-100">{coin.name}</div>
          <div className="text-sm text-gray-400 md:hidden">{coin.symbol}</div>
        </div>
      </div>
      <div className={`text-right font-mono transition-colors duration-300 ${priceColorClass}`}>
        ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
      </div>
      <div className="hidden sm:flex items-center justify-end text-right font-mono">
        {priceChangePercent > 0 && <ArrowUpIcon className="w-4 h-4 mr-1 text-emerald-400" />}
        {priceChangePercent < 0 && <ArrowDownIcon className="w-4 h-4 mr-1 text-red-400" />}
        <span className={priceChangePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}>
          {Math.abs(priceChangePercent).toFixed(2)}%
        </span>
      </div>
      <div className="hidden md:block text-right text-gray-400">{coin.symbol}</div>
    </div>
  );
};

export default CoinRow;
