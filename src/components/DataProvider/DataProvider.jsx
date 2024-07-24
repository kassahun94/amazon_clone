import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import reducer from "../../utils/Reducer";


const loadInitialState = () => {
	const savedCart = sessionStorage.getItem("cart");
	return {
		cart: savedCart ? JSON.parse(savedCart) : [],
	};
};

const initialState = loadInitialState();

export const DataContext = createContext();

const DataProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		sessionStorage.setItem("cart", JSON.stringify(state.cart));
	}, [state.cart]);
	
	const clearCart = () => {
		sessionStorage.removeItem("cart");
	};

	
	return (
		<DataContext.Provider value={[state, dispatch, clearCart]}>
			{children}
		</DataContext.Provider>
	);
};

DataProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default DataProvider;
