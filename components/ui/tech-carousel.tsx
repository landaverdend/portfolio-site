import { useState } from 'react';

type TechCarouselProps = {
  items: React.ReactNode[];
};
export default function TechCarousel({ items }: TechCarouselProps) {
  return (
    <div className="w-[325px] overflow-hidden mask-[linear-gradient(90deg,transparent_0%,#000_10%,#000_90%,transparent_100%)]">
      <div className="flex animate-dock-slide hover:paused" style={{ width: '200%' }}>
        <div className="col-span-2 flex flex-row items-center gap-4" style={{ width: '50%', flexShrink: 0 }}>
          {items.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
          <span className="w-3"></span>
        </div>
        <div className="col-span-2 flex flex-row items-center gap-4" style={{ width: '50%', flexShrink: 0 }}>
          {items.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
