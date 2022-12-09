import React from "react";
import classes from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
	return (
		<React.Fragment>
			<footer className={classes.footer}>
				<p> Contact: kandianvesh@gmail.com | Github:</p>
				<a href="https://github.com/anveshkandi" target="_blank">
					github.com/anveshkandi
				</a>
			</footer>
		</React.Fragment>
	);
};

export default Footer;
