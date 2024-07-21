import { Type } from "./ActionType";

export const initialState = {
	cart: [],
};

export const Reducer = (state, action) => {
	switch (action.type) {
		case Type.ADD_TO_CART:
			return {
				...state,
				cart: [...state.cart, action.item],
			};
		default:
			return state;
	}
};
