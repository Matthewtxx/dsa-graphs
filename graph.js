class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  addVertex(node) {
    this.nodes.add(node);
  }

  addVertices(nodes) {
    nodes.forEach(node => this.addVertex(node));
  }

  addEdge(node1, node2) {
    if (this.nodes.has(node1) && this.nodes.has(node2)) {
      node1.adjacent.add(node2);
      node2.adjacent.add(node1);
    } else {
      console.error("Both nodes must be in the graph to add an edge.");
    }
  }

  removeEdge(node1, node2) {
    if (this.nodes.has(node1) && this.nodes.has(node2)) {
      node1.adjacent.delete(node2);
      node2.adjacent.delete(node1);
    } else {
      console.error("Both nodes must be in the graph to remove an edge.");
    }
  }

  removeVertex(node) {
    if (this.nodes.has(node)) {
      this.nodes.delete(node);
      this.nodes.forEach(otherNode => this.removeEdge(node, otherNode));
    } else {
      console.error("The node must be in the graph to remove it.");
    }
  }

  depthFirstSearch(startNode) {
    const visited = new Set();
    const result = [];

    function dfs(node) {
      if (!node || visited.has(node)) {
        return;
      }

      visited.add(node);
      result.push(node.value);

      node.adjacent.forEach(neighbor => {
        dfs(neighbor);
      });
    }

    dfs(startNode);

    return result;
  }

  breadthFirstSearch(startNode) {
    const visited = new Set();
    const result = [];
    const queue = [startNode];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (!visited.has(currentNode)) {
        visited.add(currentNode);
        result.push(currentNode.value);

        currentNode.adjacent.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        });
      }
    }

    return result;
  }
}

let graph = new Graph();
let S = new Node('S');
let P = new Node('P');
let U = new Node('U');
let X = new Node('X');
let Q = new Node('Q');
let Y = new Node('Y');
let V = new Node('V');
let R = new Node('R');
let W = new Node('W');
let T = new Node('T');

graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

graph.addEdge(S, P);
graph.addEdge(S, U);

graph.addEdge(P, X);
graph.addEdge(U, X);

graph.addEdge(P, Q);
graph.addEdge(U, V);

graph.addEdge(X, Q);
graph.addEdge(X, Y);
graph.addEdge(X, V);

graph.addEdge(Q, R);
graph.addEdge(Y, R);

graph.addEdge(Y, W);
graph.addEdge(V, W);

graph.addEdge(R, T);
graph.addEdge(W, T);

console.log(graph.depthFirstSearch(S)); 

module.exports = { Graph, Node };
