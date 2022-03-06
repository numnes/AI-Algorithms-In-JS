export default class QueensGraph {
  constructor() {
    this.graph = this.makeGraph();
  }

  // Eight queens problem
  /**
   * Verifica se a posição no tabuleiro é válida dadas as posições das rainhas já posicionadas
   * @param {{x: number, y: number}} position - Posição a ser verificada
   * @param {[{x: number, y: number}]} parentQueensPositions - Posições dos antessessores
   * @returns {bool}
   */
  checkIfValid = ({ position, parentQueensPositions }) => {
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
  makeGraph = () => {
    // Objeto que armaziena a arvore de possíveis posições
    let graph = [];

    // Primeiro nó do grafo com nenhuma rainha posicionada
    let firstNode = {
      value: 0,
      name: `${0} Queens`,
      atributes: {
        position: {
          x: null,
          y: null,
        },
      },
      children: [],
    };

    // Insere as primeiras 8 possibilidades de posições na primeira coluna
    for (let i = 0; i < 8; i++) {
      firstNode.children.push(
        this.fillPositions({
          node: {
            name: `${1} Queen [${0}, ${i}]`,
            value: 1,
            atributes: { position: { x: 0, y: i } },
            children: [],
          },
          parentQueensPositions: [],
        }),
      );
    }
    graph.push(firstNode);
    return graph;
  };

  /**
   * Preenche o objeto nodes do nó passado com os nós filhos
   * @param {Object} node - Nó a ser preenchido
   * @param {[{x: number, y: number}]} node - Array de posições das rainhas antessessoras
   * @returns {Object} - Novo nó
   */
  fillPositions = ({ node, parentQueensPositions }) => {
    // Pega a proxima coluna onde será alocada a nova rainha
    let nodeColumn = node.atributes.position.x + 1;

    // Adiciona a posição do nó atual na lista de antessessores do proximo nó
    parentQueensPositions.push(node.atributes.position);

    // Verifica toda a proxima coluna procurando por uma posição válida
    for (let i = 0; i < 8; i++) {
      if (
        this.checkIfValid({
          position: { x: nodeColumn, y: i },
          parentQueensPositions,
        })
      ) {
        // Cria o novo nó
        let newNode = {
          name: `${node.value + 1} Queens [${nodeColumn}, ${i}]`,
          value: node.value + 1,
          atributes: { position: { x: nodeColumn, y: i } },
          children: [],
        };
        let newParentQueensPositions = [
          ...parentQueensPositions,
          newNode.atributes.position,
        ];
        // Chama a função para preencher os filhos do novo nó
        // e o adiciona na lista de filhos do nó atual
        node.children.push(
          this.fillPositions({
            node: newNode,
            parentQueensPositions: newParentQueensPositions,
          }),
        );
      }
    }
    return node;
  };

  getGraph() {
    return this.graph;
  }
}
