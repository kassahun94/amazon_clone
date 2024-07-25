
import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { Type } from "../../utils/ActionType";

const initialState = {
	cart: [],
};

function reducer(state, action) {
	switch (action.type) {
		case Type.ADD_TO_CART: {
			
			if (!action.item || !action.item.id) {
				console.error("Invalid payload for ADD_TO_CART:", action.item);
				return state;
			}
			const itemExists = state.cart.find((item) => item.id === action.item.id);
			if (itemExists) {
				return {
					...state,
					cart: state.cart.map((item) =>
						item.id === action.item.id
							? { ...item, amount: item.amount + 1 }
							: item
					),
				};
			}
			return {
				...state,
				cart: [...state.cart, { ...action.item, amount: 1 }],
			};
		}
		case Type.INCREMENT_ITEM:
			return {
				...state,
				cart: state.cart.map((item) =>
					item.id === action.payload
						? { ...item, amount: item.amount + 1 }
						: item
				),
			};
		case Type.DECREMENT_ITEM:
			return {
				...state,
				cart: state.cart.map((item) =>
					item.id === action.payload
						? { ...item, amount: Math.max(item.amount - 1, 1) }
						: item
				),
			};
		case Type.REMOVE_ITEM:
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.payload),
			};
		case Type.SET_USER:
			return {
				...state,
				user: action.user,
			};
		default:
			return state;
	}
}

export const DataContext = createContext();

export function DataProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<DataContext.Provider value={[state, dispatch]}>
			{children}
		</DataContext.Provider>
	);
}

DataProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
