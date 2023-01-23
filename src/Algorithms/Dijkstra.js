export function dijkstra(grid, startNode, finishNode) {
    const nodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while (!!unvisitedNodes.length) {
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return nodesInOrder;
        closestNode.isVisited = true;
        nodesInOrder.push(closestNode);
        updateNeighbor(closestNode, grid);
        if (closestNode === finishNode) return nodesInOrder;
    }
}

function updateNeighbor(node, grid) {
    const unvisitedNeighbors = getNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }

    return nodes;
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getPathOrder(finishNode) {
    const pathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        pathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return pathOrder;
}

export function animateDijkstra(
    grid,
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL
) {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodes = dijkstra(grid, startNode, finishNode);
    const pathOrder = getPathOrder(finishNode);

    for (let i = 0; i <= visitedNodes.length; i++) {
        if (i === visitedNodes.length) {
            setTimeout(() => {
                for (let j = 0; j < pathOrder.length; j++) {
                    const pathNode = pathOrder[j];
                    if (pathNode !== startNode) {
                        document
                            .getElementById(
                                `node-${pathNode.col}-${pathNode.row}`
                            )
                            .classList.remove('visited');
                        document
                            .getElementById(
                                `node-${pathNode.col}-${pathNode.row}`
                            )
                            .classList.add('shortest-path');
                    }
                }
            }, 10 * i);
            return;
        }

        setTimeout(() => {
            const node = visitedNodes[i];
            if (node !== startNode) {
                document
                    .getElementById(`node-${node.col}-${node.row}`)
                    .classList.add('visited');
            }
        }, 10 * i);
    }
}
