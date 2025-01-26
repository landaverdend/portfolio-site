import './chip-input.css';
import { useState } from 'react';

type CIProps = {
  label: string;
  placeholder?: string;
  chips: string[];

  setChips: (str: string) => void;
  removeChip: (str: string) => void;
};
export default function ChipInput({ label, placeholder, chips, setChips, removeChip }: CIProps) {
  const [chipInputValue, setChipInputValue] = useState<string>('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && chipInputValue !== '') {
      setChips(chipInputValue);
      setChipInputValue('');
    }
  };

  return (
    <div className="chip-input">
      <label>
        {label}
        <input
          type="text"
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={chipInputValue}
          onChange={(e) => setChipInputValue(e.target.value)}></input>
      </label>

      <div className="chip-container">
        {[...chips].map((str) => {
          return (
            <span key={crypto.randomUUID()} className="chip">
              {str}
              <span
                className="close"
                onClick={() => {
                  removeChip(str);
                }}>
                ✕
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
