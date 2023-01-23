import './Tile.css';

const Tile = (props) => {
    const onClickHandler = (e) => {
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
            className={`tile ${extraClassName}`}
            onClick={onClickHandler}
        ></div>
    );
};

export default Tile;
