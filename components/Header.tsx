
import React from 'react';
import SearchInput from './SearchInput';
import ToggleSwitch from './ToggleSwitch';
import { SignalIcon } from './icons';

interface HeaderProps {
  isLive: boolean;
  onToggleLive: () => void;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ isLive, onToggleLive, searchTerm, onSearchChange }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-3">
        <SignalIcon className="w-8 h-8 text-cyan-400"/>
        <h1 className="text-3xl font-bold tracking-tighter text-gray-100">
          CoinTrackr
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <SearchInput value={searchTerm} onChange={onSearchChange} />
        <ToggleSwitch isEnabled={isLive} onToggle={onToggleLive} />
      </div>
    </header>
  );
};

export default Header;
