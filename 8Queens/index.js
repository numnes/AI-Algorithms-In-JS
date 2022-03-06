// Eight queens problem

const getEmptyBoard = () => {
  let board = Array(8).fill(null);
  return board.map(() => Array(8).fill(0));
};

/**
 * Verifica se a posição no tabuleiro é válida dadas as posições das rainhas já posicionadas
 * @param {{x: number, y: number}} position - Posição a ser verificada
 * @param {[{x: number, y: number}]} parentQueensPositions - Posições dos antessessores
 * @returns {bool}
 */
const checkIfValid = ({ position, parentQueensPositions }) => {
  let valid = true;
  parentQueensPositions.forEach((parent) => {
    if (
      parent.x === position.x ||
      parent.y === position.y ||
      Math.abs(parent.x - position.x) === Math.abs(parent.y - position.y)
    ) {
      valid = false;
    }
  });
  return valid;
};

/**
 * Inicia o grafo com as primeiras posições possíveis e chama a função que preenche as demais posições
 * @returns {Object} - Raiz do grafo
 */
const makeGraph = () => {
  // Objeto que armaziena a arvore de possíveis posições
  let graph = [];

  // Primeiro nó do grafo com nenhuma rainha posicionada
  let firstNode = {
    nQueens: 0,
    position: {
      x: null,
      y: null,
    },
    nodes: [],
  };

  // Insere as primeiras 8 possibilidades de posições na primeira coluna
  for (let i = 0; i < 8; i++) {
    firstNode.nodes.push(
      fillPositions({
        node: {
          nQueens: 1,
          position: { x: 0, y: i },
          nodes: [],
        },
        parentQueensPositions: [],
      })
    );
  }
  graph.push(firstNode);
};

/**
 * Preenche o objeto nodes do nó passado com os nós filhos
 * @param {Object} node - Nó a ser preenchido
 * @param {[{x: number, y: number}]} node - Array de posições das rainhas antessessoras
 * @returns {Object} - Novo nó
 */
const fillPositions = ({ node, parentQueensPositions }) => {
  // Pega a proxima coluna onde será alocada a nova rainha
  let nodeColumn = node.position.x + 1;

  // Adiciona a posição do nó atual na lista de antessessores do proximo nó
  parentQueensPositions.push(node.position);

  // Verifica toda a proxima coluna procurando por uma posição válida
  for (let i = 0; i < 8; i++) {
    if (
      checkIfValid({
        position: { x: nodeColumn, y: i },
        parentQueensPositions,
      })
    ) {
      // Cria o novo nó
      let newNode = {
        nQueens: node.nQueens + 1,
        position: { x: nodeColumn, y: i },
        nodes: [],
      };
      let newParentQueensPositions = [
        ...parentQueensPositions,
        newNode.position,
      ];
      // Chama a função para preencher os filhos do novo nó
      // e o adiciona na lista de filhos do nó atual
      node.nodes.push(
        fillPositions({
          node: newNode,
          parentQueensPositions: newParentQueensPositions,
        })
      );
    }
  }
  return node;
};

makeGraph();
