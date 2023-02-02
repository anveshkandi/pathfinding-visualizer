import './PathfindingVisualizer.css';
import Tile from './Tile';
import { animateDijkstra } from '../Algorithms/Dijkstra';
import { animateAStar } from '../Algorithms/Astar';

const Grid = () => {
    let grid = [];
    let mouseIsPressed = false;
    let movingStart = false;
    let movingFinish = false;
    let START_NODE_ROW = 6;
    let START_NODE_COL = 6;
    let FINISH_NODE_ROW = 18;
    let FINISH_NODE_COL = 7;

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

    const clrPathHandler = () => {
        for (const row of grid) {
            for (const node of row) {
                node.f = 0;
                node.g = 0;
                node.f = 0;
                node.distance = Infinity;
                node.isVisited = false;
                node.previousNode = null;

                let nodeID = document.getElementById(
                    `node-${node.col}-${node.row}`
                );
                if (nodeID.classList.contains('visited'))
                    nodeID.classList.remove('visited');
                if (nodeID.classList.contains('shortest-path'))
                    nodeID.classList.remove('shortest-path');
            }
        }
    };

    const onMouseDownHandler = (e) => {
        let tileID = e.target.id;
        mouseIsPressed = true;
        toggleWall(tileID);
        if (document.getElementById(tileID).classList.contains('start-tile')) {
            movingStart = true;
        }
        if (document.getElementById(tileID).classList.contains('finish-tile')) {
            movingFinish = true;
        }
    };

    const onMouseEnterHandler = (e) => {
        let tileID = e.target.id;
        let tile = document.getElementById(tileID);
        let coordinates = tileID.split('-');
        let xCoord = coordinates[1];
        let yCoord = coordinates[2];

        if (mouseIsPressed && !movingStart && !movingFinish) {
            toggleWall(tileID);
        }

        if (movingStart) {
            tile.classList.add('start-tile');
            START_NODE_ROW = yCoord;
            START_NODE_COL = xCoord;
        }

        if (movingFinish) {
            tile.classList.add('finish-tile');
            FINISH_NODE_ROW = yCoord;
            FINISH_NODE_COL = xCoord;
        }
    };

    const onMouseLeaveHandler = (e) => {
        let tileID = e.target.id;
        let tile = document.getElementById(tileID);

        if (movingStart) {
            tile.classList.remove('start-tile');
        }
        if (movingFinish) {
            tile.classList.remove('finish-tile');
        }
    };

    const onMouseUpHandler = () => {
        mouseIsPressed = false;
        movingStart = false;
        movingFinish = false;
    };

    function toggleWall(tileID) {
        let tile = document.getElementById(tileID);
        let coordinates = tileID.split('-');
        let xCoord = coordinates[1];
        let yCoord = coordinates[2];
        if (
            tile.classList.contains('wall') &&
            !tile.classList.contains('start-tile') &&
            !tile.classList.contains('finish-tile')
        ) {
            document.getElementById(tileID).classList.remove('wall');
            grid[yCoord][xCoord].isWall = false;
        }
        if (
            !tile.classList.contains('start-tile') &&
            !tile.classList.contains('finish-tile')
        ) {
            document.getElementById(tileID).classList.add('wall');
            grid[yCoord][xCoord].isWall = true;
        }
    }

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
                <button className="clrPathBtn" onClick={clrPathHandler}>
                    Clear Path
                </button>
            </div>
            <div
                className="test"
                id="grid"
                draggable="false"
                onMouseLeave={onMouseUpHandler}
            >
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx} draggable="false">
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
                                        onMouseDown={onMouseDownHandler}
                                        onMouseEnter={onMouseEnterHandler}
                                        onMouseUp={onMouseUpHandler}
                                        onMouseLeave={onMouseLeaveHandler}
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
