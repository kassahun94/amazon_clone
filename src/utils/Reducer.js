import { Type } from "../utils/ActionType";

const initialState = {
	cart: [],
	user: null,
};

const reducer = (state = initialState, action) => {
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
		case Type.CLEAR_CART:
			return {
				...state,
				cart: [], 
			};
		case Type.SET_USER:
			return {
				...state,
				user: action.user,
			};
		default:
			return state;
	}
};

export default reducer;
