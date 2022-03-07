export default class IterativeDeepening {
  constructor({ graph, maxDepth }) {
    this.graph = graph[0];
    this.maxDepth = maxDepth;
    this.maxValue = 0;
    this.path = [];
    this.maxNode = {};
  }

  /**
   * Faz a busca pelo maior valor dentro da profundidade máxima
   */
  async solve() {
    // Objeto de resultado
    let result = {
      path: {},
      positions: [],
      value: 0,
    };

    console.log('profundidade');
    console.log(this.maxDepth);
    // Array de caminho
    let initialPath = [];

    //Faz a busca no grafo
    await this.recursiveSearch({
      node: this.graph,
      depth: 0,
      path: initialPath,
    });

    // Monta o caminho encontrado
    let resultPath = this.path;
    result.positions = this.maxNode.path;

    while (resultPath.length >= 2) {
      let node = resultPath.pop();
      resultPath[resultPath.length - 1].children = [node];
    }
    let resultGraph = resultPath[0];
    result.path = resultGraph;
    result.positions = this.maxNode.path;
    result.value = this.maxValue;
    return result;
  }

  recursiveSearch({ node, depth, path }) {
    return new Promise((resolve) => {
      if (node.value > this.maxValue) {
        this.maxValue = node.value;
        this.path = path;
        this.maxNode = node;
      }
      if (depth === this.maxDepth) return resolve(true);

      let checkChildren = node.children.map((child) =>
        this.recursiveSearch({
          node: child,
          depth: depth + 1,
          path: [...path, node],
        }),
      );
      Promise.all(checkChildren).then(() => resolve(true));
    });
  }
}
