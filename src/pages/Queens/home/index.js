import React, { useEffect } from 'react';
import Tree from 'react-d3-tree';
import QueensGraph from 'Algorithms/queens/QueensGraph';
import { Link } from 'react-router-dom';

import { QueensWrapper } from './styles';
import { DefaultButton } from 'styles/global';

export default function QueensHome() {
  const [graph, setGraph] = React.useState({});
  useEffect(() => {
    const graph = new QueensGraph();
    setGraph(graph.graph);
    console.log(graph.graph);
  }, [setGraph]);
  return (
    <QueensWrapper>
      <div className="header-page">
        <Link to="searchalgorithms">
          <DefaultButton>Search Algorithms</DefaultButton>
        </Link>
      </div>
      <div className="chart-wrapper">
        <Tree
          data={graph}
          orientation="vertical"
          collapsible={false}
          pathFunc="step"
        />
      </div>
    </QueensWrapper>
  );
}
