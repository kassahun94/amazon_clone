import PropTypes from "prop-types";
import Header from "../header/Header";

function LayOut({ children }) {
	return (
		<div>
			<Header />
			<main >{children}</main>
		</div>
	);
}

LayOut.propTypes = {
	children: PropTypes.node.isRequired,
};

export default LayOut;
