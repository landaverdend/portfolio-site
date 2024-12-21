import { useEffect, useState } from 'react';
import './loading-bar.css';
import { useAppState } from '@/state/appState';

const fakeServiceCalls = [
  'Connecting to the ByteBuster Bitter Botter API...',
  'Spinning up instance of Gizzer Ginker Load Balancer...',
  'Securing your packets using the Gitmo Garbler...',
  'Whirling up the GiggleSync Chirpy-Tweet Server...',
  'Balancing loads with the FiddleFaddle Load-Juggler...',
  'Routing through the WiggleWonk Proxy Shuffler...',
  'Deploying with the Puff-a-Lump Docker Flocker...',
  'Tuning the TiddleTock WebSocket Chirper-Pinger...',
  'Toggling flags in the Flip-Flop Feature-Switch Clicker...',
  'Balancing loads with the WobbleWomp Elastic Whirler...',
  'Listening in on the SqueakyQueue Message Catcher...',
  'Sniffing logs with the CloudWatch Snicker-Snooper Monitor...',
  'Encrypting secrets with the WobbleVault KMS Lock-Clicker...',
  'Autoscaling with the Grow-a-Lot EC2 Popper Upper...',
];

// TODO: style this for mozilla.
function LoadingBar() {
  const [progress, setProgress] = useState(15);
  const [ind, setInd] = useState(0);
  const { nextComponent, setView, setIsLoadingBarDone } = useAppState();

  // for state.
  useEffect(() => {
    if (progress >= 100) {
      setView(nextComponent);
      setIsLoadingBarDone(true);
    }
  }, [progress]);

  // FOR DEBUG PURPOSES ONLY
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === '=') {
        setProgress(100);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // For intervals.
  useEffect(() => {
    const tickProgress = setInterval(() => {
      // const tick = Math.random() * 3.8;
      const tick = Math.random() * 0.8;

      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(tickProgress);
        }
        return prevProgress + tick;
      });
    }, 100);

    const setServiceCall = setInterval(() => {
      if (progress <= 100) setInd(Math.floor(Math.random() * fakeServiceCalls.length));
    }, 3000);

    return () => {
      clearInterval(tickProgress);
      clearInterval(setServiceCall);
    };
  }, []);

  return (
    <div className="loading-container">
      <span className="loading-container__label">{fakeServiceCalls[ind]}</span>
      <progress className="loading-container__progress" max={100} value={progress}></progress>
    </div>
  );
}

export default LoadingBar;
