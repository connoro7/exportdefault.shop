import { CART_ADD_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const itemExists = state.cartItems.find((i) => i.product === item.product)

      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) => (i.product === itemExists.product ? item : i)),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    default:
      return state
  }
}
