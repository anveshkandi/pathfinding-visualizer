import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";
import { useEffect, useState } from "react";
import classes from "./Grid.css";
import Tile from "./Tile";
const Grid = () => {
	useEffect(() => {
		createGrid();
	});
	const createGrid = () => {
		const wrapper = document.getElementById("grid");
		wrapper.innerHTML = "";
		let rows = Math.floor(wrapper.clientHeight / 200);
		let columns = Math.floor(wrapper.clientWidth / 200);

		wrapper.style.setProperty("--columns", columns);
		wrapper.style.setProperty("--rows", rows);
		createTileArray(rows * columns);
	};

	const createTile = (index) => {
		const tile = document.createElement("div");
		tile.classList.add("tile");
		return tile;
	};

	const createTileArray = (quantity) => {
		Array.from(Array(quantity)).map((tile, index) => {
			document.getElementById("grid").appendChild(createTile(index));
		});
	};
	return <div className="test" id="grid"></div>;
};

export default Grid;
