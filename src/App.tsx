import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-center pt-2'>
        <div className="flex justify-center bg-white p-8 rounded-lg shadow-lg w-96 mb-8">
          <div className="text-6xl font-mono text-center">{formatTime(time)}</div>
          <div className="flex justify-center ml-8">
            <button
              onClick={handleStartStop}
              className={`flex items-center gap-2 px-6 rounded-lg text-white font-medium transition-colors ${
                isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isRunning ? <Pause size={20} /> : <Play size={20} />}
              {isRunning ? 'Stop' : 'Start'}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full px-4">
        <iframe
          id="JotFormIFrame"
          title="Contact Form"
          src="https://form.jotform.com/250774002583050"
          frameBorder="0"
          allowTransparency={true}
          allowFullScreen
          className="w-full border-0 shadow-lg rounded-lg"
          style={{minHeight:'calc(100vh - 170px)',width: '100%', overflow:'hidden' }}
          onLoad={() => {
            window.parent.postMessage({ type: 'iframe-ready' }, '*');
          }}
        />
      </div>
    </div>
  );
}

export default App;
