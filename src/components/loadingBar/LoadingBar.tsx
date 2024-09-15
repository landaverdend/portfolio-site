import { useEffect, useState } from 'react';
import './loading-bar.css';

// TODO: style this for mozilla.
function LoadingBar() {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const tickProgress = setInterval(() => {
      const tick = Math.random();

      setProgress((prevProgress) => {
        console.log('running');

        if (prevProgress >= 100) clearInterval(tickProgress); // remove unnecessary calls.
        return prevProgress + tick;
      });
    }, 100);

    return () => {
      clearInterval(tickProgress);
    };
  }, []);

  return (
    <div className="loading-container">
      <span className="loading-container__label">hello</span>
      <progress className="loading-container__progress" max={100} value={progress}></progress>
    </div>
  );
}

export default LoadingBar;
