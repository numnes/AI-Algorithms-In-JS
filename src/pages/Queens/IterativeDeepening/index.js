import React, { useState } from 'react';
import { Board } from 'ii-react-chessboard';
import QueensGraph from 'Algorithms/queens/QueensGraph';
import IterativeDeepening from 'Algorithms/blindSearch/IterativeDeepening';
import Tree from 'react-d3-tree';

import { SearchAlgorithmsWrapper } from './styles';

export default function SearchAlgorithms() {
  const [resultGraph, setResultGraph] = useState({});
  const [boardConfig, setBoardConfig] = useState('8/8/8/3qq3/3qq3/8/8/8');
  const [maxDepth, setMaxDepth] = useState(4);

  const execute = async () => {
    console.log('profundidade');
    console.log(maxDepth);
    let newQueensGraph = new QueensGraph();
    let iterativeDeepening = new IterativeDeepening({
      graph: newQueensGraph.graph,
      maxDepth: parseInt(maxDepth),
    });
    let search = await iterativeDeepening.solve();
    console.log(search);
    setResultGraph(search.path);
    console.log(coordinatesToChessFEN(search.positions));
    setBoardConfig(coordinatesToChessFEN(search.positions));
  };

  // Converte as coordenadas das rainhas para formato fen usado pelo Chessboard
  const coordinatesToChessFEN = (positions) => {
    let fen = '';
    let board = Array(8)
      .fill(0)
      .map(() => Array(8).fill(0));
    positions.forEach((position) => {
      board[position.y][position.x] = 1;
    });
    for (let i = 0; i < 8; i++) {
      let found = false;
      for (let j = 0; j < 8; j++) {
        if (board[i][j] === 1) {
          found = true;
          if (j === 0) {
            fen += 'q7';
          } else if (j === 7) {
            fen += '7q';
          } else {
            fen += `${j}q${7 - j}`;
          }
          break;
        }
      }
      if (!found) fen += '8';
      if (i !== 7) fen += '/';
    }

    return fen;
  };

  return (
    <SearchAlgorithmsWrapper>
      <div className="boardWrapper">
        <Board position={boardConfig} />
        <button onClick={execute}>executar</button>
        <input
          type="number"
          value={maxDepth}
          onChange={(e) => {
            setMaxDepth(e.target.value);
          }}
        />
      </div>
      <div className="chartWrapper">
        <Tree
          data={resultGraph}
          orientation="vertical"
          collapsible={false}
          pathFunc="step"
        />
      </div>
    </SearchAlgorithmsWrapper>
  );
}
