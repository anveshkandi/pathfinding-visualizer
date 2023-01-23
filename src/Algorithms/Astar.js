export function astar(grid, startNode, finishNode) {
    let openList = [];
    let closedList = [];
    let currentNodesInOrder = [];
    openList.push(startNode);

    while (!!openList.length) {
        //Search open list for lowest F cost
        let lowestFCost = 0;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < openList[lowestFCost].f) lowestFCost = i;
        }

        let currentNode = openList[lowestFCost];
        currentNodesInOrder.push(currentNode);

        //If result is found, return an array with nodes on the path order
        if (currentNode === finishNode) {
            return currentNodesInOrder;
        }

        //Move current node to closed, process the neighbors
        let currNodeIdx = openList.indexOf(currentNode);
        openList.splice(currNodeIdx, 1);
        closedList.push(currentNode);

        let neighbors = getNeighbors(grid, currentNode);
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            //If neighbor is in closed list, check next neighbor
            if (closedList.includes(neighbor) || neighbor.isWall) continue;
            let gCost = currentNode.g + 1;
            let gCostIsBest = false;

            //If first time seeing neighbor, get heuristic for the  node and add it to open list
            if (!neighbor.isVisited) {
                gCostIsBest = true;
                neighbor.h = manhattenDistance(neighbor, finishNode);
                neighbor.isVisited = true;
                openList.push(neighbor);
            } else if (gCost < neighbor.g) gCostIsBest = true;

            if (gCostIsBest) {
                neighbor.previousNode = currentNode;
                neighbor.g = gCost;
                neighbor.f = neighbor.g + neighbor.h;
            }
        }
    }

    return [];
}

function getShortestPath(finishedNode) {
    let curr = finishedNode;
    let pathNodes = [];
    while (curr.previousNode) {
        pathNodes.push(curr);
        curr = curr.previousNode;
    }
    return pathNodes.reverse();
}

function manhattenDistance(node1, node2) {
    let x1 = node1.row;
    let x2 = node2.row;
    let y1 = node1.col;
    let y2 = node2.col;

    let d1 = Math.abs(x2 - x1);
    let d2 = Math.abs(y2 - y1);

    return d1 + d2;
}

function getNeighbors(grid, node) {
    let neighbors = [];
    let x = node.row;
    let y = node.col;

    if (!!grid[x - 1] && !!grid[x - 1][y]) neighbors.push(grid[x - 1][y]); //Left
    if (!!grid[x + 1] && !!grid[x + 1][y]) neighbors.push(grid[x + 1][y]); //Right
    if (!!grid[x][y + 1]) neighbors.push(grid[x][y + 1]); //Down
    if (!!grid[x][y - 1]) neighbors.push(grid[x][y - 1]); //Up

    return neighbors;
}

export function animateAStar(
    grid,
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL
) {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let path = astar(grid, startNode, finishNode);
    let pathOrder = getShortestPath(finishNode);

    for (let i = 0; i <= path.length; i++) {
        if (i === path.length) {
            setTimeout(() => {
                for (let j = 0; j < pathOrder.length; j++) {
                    const pathNode = pathOrder[j];
                    document
                        .getElementById(`node-${pathNode.col}-${pathNode.row}`)
                        .classList.remove('visited');
                    document
                        .getElementById(`node-${pathNode.col}-${pathNode.row}`)
                        .classList.add('shortest-path');
                }
            }, 10 * i);
            return;
        }

        setTimeout(() => {
            const node = path[i];
            if (node !== startNode) {
                document
                    .getElementById(`node-${node.col}-${node.row}`)
                    .classList.add('visited');
            }
        }, 10 * i);
    }
}
