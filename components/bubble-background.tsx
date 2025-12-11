'use client';

export default function BubbleBackground() {
  const bubbles = [
    { size: 'w-72 h-72', delay: '0s', duration: '20s', x: '10%', y: '20%', opacity: 'opacity-22' },
    { size: 'w-156 h-156', delay: '2s', duration: '25s', x: '80%', y: '60%', opacity: 'opacity-20' },
    { size: 'w-90 h-90', delay: '4s', duration: '30s', x: '40%', y: '10%', opacity: 'opacity-18' },
    { size: 'w-90 h-90', delay: '1s', duration: '22s', x: '20%', y: '70%', opacity: 'opacity-21' },
    { size: 'w-90 h-90', delay: '3s', duration: '18s', x: '70%', y: '30%', opacity: 'opacity-19' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {bubbles.map((bubble, i) => (
        <div
          key={i}
          className={`absolute ${bubble.size} ${bubble.opacity} rounded-full blur-3xl
            bg-linear-to-r from-pink-500/60  to-fuchsia-500/10
            animate-float`}
          style={{
            left: bubble.x,
            top: bubble.y,
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
          }}
        />
      ))}
    </div>
  );
}
