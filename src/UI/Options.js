import React from "react";
import classes from "./Options.module.css";
import Dropdown from "./Dropdown";
const Options = () => {
	return (
		<React.Fragment>
			<div className={classes["main-header"]}>
				<h1 className={classes.title}> Pathfinding Visualizer </h1>
				<Dropdown />
			</div>
		</React.Fragment>
	);
};

export default Options;
