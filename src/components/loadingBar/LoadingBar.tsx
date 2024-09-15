import { useEffect, useState } from 'react';
import './loading-bar.css';

// TODO: style this for mozilla.
function LoadingBar() {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const tickProgress = setInterval(() => {
      const tick = Math.random();

      setProgress((prevProgress) => {
        return prevProgress + tick;
      }); // Use functional update to access the latest state
    }, 100);
    
    return () => {
      clearInterval(tickProgress);
      console.log('unmounting progress bar...');
    };
  }, []);

  return (
    <>
      <progress max={100} value={progress}></progress>
    </>
  );
}

export default LoadingBar;
