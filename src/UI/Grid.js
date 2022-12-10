// import { useEffect, useState } from 'react';
import './Grid.css';
import Tile from './Tile';

const Grid = () => {
    let grid = [];
    // const wrapper = document.getElementById('grid');
    // wrapper.innerHTML = '';
    // let rows = Math.floor(wrapper.clientHeight / 50);
    // let columns = Math.floor(wrapper.clientWidth / 50);

    // wrapper.style.setProperty('--columns', columns);
    // wrapper.style.setProperty('--rows', rows);

    const createTile = (row, col) => {
        return {
            row,
            col,
        };
    };

    for (let row = 0; row < 35; row++) {
        const currentRow = [];
        for (let col = 0; col < 14; col++) {
            currentRow.push(createTile(row, col));
        }
        grid.push(currentRow);
    }

    const clickButtonHandler = () => {
        for (let i = 0; i < 14; i++) {
            setTimeout(() => {
                document.getElementById(`node-20-${i}`).style.backgroundColor =
                    'red';
            }, 100 * i);
        }
    };

    // console.log(grid);

    return (
        <div className="container">
            <button className="testBtn" onClick={clickButtonHandler}>
                Blahblah
            </button>
            <div className="test" id="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((tile, tileIdx) => {
                                const { row, col } = tile;
                                return (
                                    <Tile row={row} col={col} key={tileIdx} />
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

// const createTile = (index) => {
//     const tile = document.createElement('div');
//     tile.classList.add('tile');
//     return tile;
// };

// const createTileArray = (quantity) => {
//     Array.from(Array(quantity)).map((tile, index) => {
//         document.getElementById('grid').appendChild(createTile(index));
//     });
// };
