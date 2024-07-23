import { Type } from "../utils/ActionType";

const reducer = (state, action) => {
	switch (action.type) {
		case Type.ADD_TO_CART:
			return {
				...state,
				cart: [...state.cart, { ...action.item, amount: 1 }],
			};
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
		default:
			return state;
	}
};

export default reducer;
