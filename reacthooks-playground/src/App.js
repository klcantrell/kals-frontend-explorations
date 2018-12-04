/** @jsx jsx */
import { useState, useEffect, useRef } from 'react';
import { css, jsx, Global } from '@emotion/core';

function IncButton({ handleClick }) {
  return (
    <button css={incButtonStyles}  onClick={handleClick}>
      +
    </button>
  );
}

const incButtonStyles = css`
  padding: 0px 20px;
  font-size: 80px;
  background-color: rgb(0, 119, 255);
  border-color: rgb(0, 119, 255);
  border-radius: 10px;
`;

function CountDisplay({ count }) {
  return <div css={countDisplayStyles}>{count}</div>;
}

const countDisplayStyles = css`
  font-size: 50px;
`;

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
      css={appStyles}
      style={{
        backgroundColor: `
        rgb(${calcRed(count)}, ${calcGreen(count)}, ${calcBlue(count)})`,
      }}
      ref={container}
    >
      <Global styles={css`
        .all-done {
          border: 5px solid rgb(255, 0, 255);
        }
        .all-done::after {
          content: 'Yer done!';
          display: block;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 25%;
          font-size: 30px;
        }
      `} />
      <CountDisplay count={count} />
      <IncButton handleClick={incrementCount} />
    </div>
  );
}

const appStyles = css`
  position: relative;
  background-color: blue;
  border-radius: 30%;
  width: 500px;
  height: 500px;
  display: grid;
  justify-content: center;
  justify-items: center;
  align-content: center;
  margin: auto;
  box-sizing: border-box;
  border: 5px solid transparent;
  font-family: fantasy;
`;

export default App