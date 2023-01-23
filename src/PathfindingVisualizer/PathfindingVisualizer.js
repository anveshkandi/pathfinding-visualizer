import './PathfindingVisualizer.css';
import Tile from './Tile';
import { animateDijkstra } from '../Algorithms/Dijkstra';
import { animateAStar } from '../Algorithms/Astar';

const START_NODE_ROW = 6;
const START_NODE_COL = 6;
const FINISH_NODE_ROW = 18;
const FINISH_NODE_COL = 7;

const Grid = () => {
    let grid = [];

    const createTile = (col, row) => {
        return {
            row,
            col,
            f: 0,
            g: 0,
            h: 0,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        };
    };

    //Generates initial grid
    for (let row = 0; row < 35; row++) {
        const currentRow = [];
        for (let col = 0; col < 14; col++) {
            currentRow.push(createTile(col, row));
        }
        grid.push(currentRow);
    }

    //Launches Dijkstra's Algorithm animation
    const dijkstraButtonHandler = () => {
        animateDijkstra(
            grid,
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL
        );
    };

    //Launches A* Algorithm animation
    const astarButtonHandler = () => {
        animateAStar(
            grid,
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL
        );
    };

    //Clears grid and resets node values
    const clrButtonHandler = () => {
        for (const row of grid) {
            for (const node of row) {
                node.f = 0;
                node.g = 0;
                node.f = 0;
                node.distance = Infinity;
                node.isVisited = false;
                node.isWall = false;
                node.previousNode = null;

                let nodeID = document.getElementById(
                    `node-${node.col}-${node.row}`
                );
                if (nodeID.classList.contains('wall'))
                    nodeID.classList.remove('wall');
                if (nodeID.classList.contains('visited'))
                    nodeID.classList.remove('visited');
                if (nodeID.classList.contains('shortest-path'))
                    nodeID.classList.remove('shortest-path');
            }
        }
    };

    return (
        <div className="container">
            <div className="main-header">
                <h1 className="title"> Pathfinding Visualizer </h1>
                <button className="dijkstraBtn" onClick={dijkstraButtonHandler}>
                    Dijkstra's Algorithm
                </button>
                <button className="aStarBtn" onClick={astarButtonHandler}>
                    A* Algorithm
                </button>
                <button className="clrBtn" onClick={clrButtonHandler}>
                    Clear
                </button>
            </div>
            <div className="test" id="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((tile, tileIdx) => {
                                const { row, col, isFinish, isStart, isWall } =
                                    tile;
                                return (
                                    <Tile
                                        row={row}
                                        col={col}
                                        key={tileIdx}
                                        isFinish={isFinish}
                                        isStart={isStart}
                                        isWall={isWall}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Grid;
