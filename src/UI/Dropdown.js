import { useState } from "react";
import classes from "./Dropdown.module.css";

const Dropdown = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(!open);
		console.log(open);
	};

	return (
		<div className={classes.dropdown}>
			<button onClick={handleOpen} className={classes.button}>
				Pick an algorithm!
			</button>
			{open ? (
				<ul className={classes.menu}>
					<li className={classes["menu-item"]}>
						<button>Option 1</button>
					</li>
					<li className={classes["menu-item"]}>
						<button>Option 2</button>
					</li>
				</ul>
			) : null}
		</div>
	);
};

export default Dropdown;
