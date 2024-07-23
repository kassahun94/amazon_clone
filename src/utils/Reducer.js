import { Type } from "./ActionType"; // Assuming ActionType.js or ActionType.jsx contains action types

export const initialState = {
	cart: [],
	// Add other initial state properties here if needed
};

export const Reducer = (state, action) => {
	console.log("Reducer action:", action);
	switch (action.type) {
		case Type.ADD_TO_CART: {
			const existingItemIndex = state.cart.findIndex(
				(item) => item.id === action.item.id
			);

			if (existingItemIndex !== -1) {
				const updatedCart = state.cart.map((item, index) =>
					index === existingItemIndex
						? { ...item, amount: item.amount + 1 }
						: item
				);

				console.log("Updated cart with increased amount:", updatedCart);

				return {
					...state,
					cart: updatedCart,
				};
			} else {
				console.log("Adding new item to cart:", action.item);

				return {
					...state,
					cart: [...state.cart, { ...action.item, amount: 1 }],
				};
			}
		}

		case Type.REMOVE_FROM_CART: {
			const updatedCart = state.cart.filter(
				(item) => item.id !== action.item.id
			);

			console.log("Updated cart after removal:", updatedCart);

			return {
				...state,
				cart: updatedCart,
			};
		}

default:
			return state;
	}
};
