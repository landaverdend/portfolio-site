import { useEffect, useState } from 'react';
import './background-bubbles.css';

interface BubbleConfig {
  size: number;
  position: {
    top: string;
    left?: string;
    right?: string;
  };
  color: string;
  reverse?: boolean;
}

const BackgroundBubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<BubbleConfig[]>([]);
  
  useEffect(() => {
    const generateBubbles = () => {
      const containerHeight = document.querySelector('.resume-container')?.clientHeight || 0;
      const sections = Math.ceil(containerHeight / 800); // One pair of bubbles every 800px
      
      // Predefined gradients for consistency
      const gradients = [
        'rgba(148, 180, 255, 0.494)', // blue
        'rgba(197, 255, 148, 0.655)', // green
        'rgba(255, 162, 231, 0.655)', // pink
        'rgba(169, 255, 239, 0.655)', // cyan
        'rgba(255, 169, 185, 0.655)', // salmon
        'rgba(162, 255, 186, 0.553)', // mint
      ];

      // Generate bubble configs
      const newBubbles: BubbleConfig[] = [];
      for (let i = 0; i < sections * 2; i++) {
        // Alternate between left and right
        const isRight = i % 2 === 0;
        newBubbles.push({
          size: Math.max(800, Math.random() * 100 + 800),
          position: {
            top: `${(Math.floor(i / 2) * 30)}%`,
            [isRight ? 'right' : 'left']: '-200px'
          },
          color: gradients[i % gradients.length],
          reverse: i % 3 === 0 // Every third bubble moves in reverse
        });
      }
      
      setBubbles(newBubbles);
    };

    generateBubbles();
    window.addEventListener('resize', generateBubbles);
    return () => window.removeEventListener('resize', generateBubbles);
  }, []);

  return (
    <>
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className={`bubble ${bubble.reverse ? 'reverse' : ''}`}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            ...bubble.position,
            background: `radial-gradient(${bubble.color} 35%, rgba(255, 255, 255, 0) 70%)`
          }}
        />
      ))}
    </>
  );
};

export default BackgroundBubbles; 