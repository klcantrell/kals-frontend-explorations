import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button
      className={`square${props.highlight ? " highlighted" : ""}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function Board(props) {
  function renderSquare(i) {
    return (
      <Square
        key={i}
        value={props.squares[i]}
        highlight={i === props.lastSpace ? true : false}
        onClick={() => props.onClick(i)}
      />
    );
  }

  const SQUARES_PER_ROW = 3;
  const rows = [];
  let currentSpace = 0;

  for (let i = 0; i < 3; i++) {
    const squares = [];
    for (let x = 0; x < SQUARES_PER_ROW; x++) {
      squares.push(renderSquare(currentSpace));
      currentSpace++;
    }

    rows.push(
      <div key={i} className="board-row">
        {squares}
      </div>
    );
  }

  return <div>{rows}</div>;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          lastSpace: null
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);

    if (winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          lastSpace: i
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      let desc;
      if (move) {
        const [col, row] = calculateColRow(step.lastSpace);
        desc = `Go to move #${move} at row ${row}, col ${col}`;
      } else {
        desc = "Go To game start";
      }

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            lastSpace={current.lastSpace}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateColRow(space) {
  const mapping = {
    0: [1, 1],
    1: [2, 1],
    2: [3, 1],
    3: [1, 2],
    4: [2, 2],
    5: [3, 2],
    6: [1, 3],
    7: [2, 3],
    8: [3, 3]
  };
  return mapping[space];
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
