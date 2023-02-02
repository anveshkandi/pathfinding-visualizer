import './Tile.css';
const Tile = (props) => {
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
            className={`tile ${extraClassName}`}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            draggable="false"
        ></div>
    );
};

export default Tile;
