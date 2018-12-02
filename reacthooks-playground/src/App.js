import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function IncButton({ handleClick }) {
  return (
    <button className="inc-button" onClick={handleClick}>
      +
    </button>
  );
}

function CountDisplay({ count }) {
  return <div className="count-display">{count}</div>;
}

function App() {
  const [count, setCount] = useState(0);
  const container = useRef(null);
  useEffect(() => {
    if (count >= 80) {
      container.current.classList.add('all-done');
    }
  });
  const incrementCount = () => {
    if (count < 80) {
      setCount(count + 1);
    }
  };

  const calcRed = index => {
    if (index < 30) {
      return 50;
    }
    if ((index - 30) * 5 > 255) {
      return 255;
    }
    return (index - 30) * 5;
  };

  const calcBlue = index => {
    if (index < 5) {
      return 50;
    }
    if ((index - 20) * 5 > 180) {
      return 180;
    }
    return (index - 20) * 5;
  };

  const calcGreen = index => {
    if (index > 20) {
      return 150;
    }
    return 50 + index * 5;
  };
  return (
    <div
      className="App"
      style={{
        backgroundColor: `
        rgb(${calcRed(count)}, ${calcGreen(count)}, ${calcBlue(count)})`,
      }}
      ref={container}
    >
      <CountDisplay count={count} />
      <IncButton handleClick={incrementCount} />
    </div>
  );
}

export default App;
