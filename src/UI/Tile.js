import classes from './Tile.module.css';

const Tile = (props) => {
    const onClickHandler = () => {
        console.log('Tile clicked!');
    };

    return (
        <div
            id={`node-${props.row}-${props.col}`}
            className={`${classes.tile}`}
            onClick={onClickHandler}
        ></div>
    );
};

export default Tile;
