
import React from 'react';

interface ToggleSwitchProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isEnabled, onToggle }) => {
  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-medium ${isEnabled ? 'text-gray-200' : 'text-gray-500'}`}>
        Live Updates
      </span>
      <button
        onClick={onToggle}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 ${isEnabled ? 'bg-cyan-500' : 'bg-gray-700'}`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
