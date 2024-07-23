import  { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import reducer from "../../utils/Reducer";

const initialState = {
	cart: [],
};

// Create context
export const DataContext = createContext();

// Define provider component
const DataProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<DataContext.Provider value={[state, dispatch]}>
			{children}
		</DataContext.Provider>
	);
};

// Validate children prop
DataProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default DataProvider;
