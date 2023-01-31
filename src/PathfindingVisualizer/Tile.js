import './Tile.css';
import { useState } from 'react';
const Tile = (props) => {
    const [isWall, setIsWall] = useState(false);
    const onClickHandler = (e) => {
        setIsWall(!isWall);
        console.log(e);
    };

    const extraClassName = props.isStart
        ? 'start-tile'
        : props.isFinish
        ? 'finish-tile'
        : props.isWall
        ? 'wall'
        : '';

    return (
        <div
            id={`node-${props.col}-${props.row}`}
            className={`tile ${extraClassName} ${isWall ? 'wall' : ''}`}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            onMouseEnter={props.onMouseEnter}
            draggable="false"
        ></div>
    );
};

export default Tile;
