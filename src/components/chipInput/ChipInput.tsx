import './chip-input.css';
import { useState } from 'react';

type CIProps = {
  label: string;
};
export default function ChipInput({ label }: CIProps) {
  const [techKeywordChips, setTechKeywordChips] = useState<Array<string>>([]);
  const [chipInputValue, setChipInputValue] = useState<string>('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && chipInputValue !== '') {
      setTechKeywordChips((prev) => [...prev, chipInputValue]);
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
          value={chipInputValue}
          onChange={(e) => setChipInputValue(e.target.value)}></input>
      </label>

      <div className="chip-container">
        {[...techKeywordChips].map((str) => {
          return (
            <span key={crypto.randomUUID()} className="chip">
              {str}
              <span
                className="close"
                onClick={() => {
                  setTechKeywordChips(techKeywordChips.filter((el) => el !== str));
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
