import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const DataContext = createContext();

const DataProvider = ({ children, reducer, initialState }) => {
	return (
		<DataContext.Provider value={useReducer(reducer, initialState)}>
			{children}
		</DataContext.Provider>
	);
};

DataProvider.propTypes = {
	children: PropTypes.node.isRequired,
	reducer: PropTypes.func.isRequired,
	initialState: PropTypes.object.isRequired,
};

export default DataProvider;
