// @ts-nocheck
export const productReducer = (productState, productAction) => {
  const { cart, wishList } = productState
  const cartItem = cart.find((item) => item._id === productAction.payload._id)
  const wishListItem = wishList.find(
    (item) => item._id === productAction.payload._id,
  )
  switch (productAction.type) {
    case 'ADD_TO_CART':
      return { ...productState, cart: productAction.payload }
    case 'REMOVE_FROM_CART':
      return {
        ...productState,
        cart: productAction.payload,
      }
    case 'ADD_TO_WISHLIST':
      return { ...productState, wishList: productAction.payload }
    case 'MOVE_TO_CART':
      if (cartItem) {
        return {
          ...productState,
          wishList: wishList.filter(
            (item) => item._id !== productAction.payload._id,
          ),
          cart: cart.map((item) =>
            item._id === productAction.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      } else {
        return {
          ...productState,
          wishList: wishList.filter(
            (item) => item._id !== productAction.payload._id,
          ),
          cart: [...cart, productAction.payload],
        }
      }
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...productState,
        wishList: productAction.payload,
      }
    case 'MOVE_TO_WISHLIST':
      if (wishListItem) {
        return {
          ...productState,
          cart: cart.filter((item) => item._id !== productAction.payload._id),
        }
      } else {
        return {
          ...productState,
          wishList: [...wishList, productAction.payload],
          cart: cart.filter((item) => item._id !== productAction.payload._id),
        }
      }
    case 'INCREASE_QUANTITY':
      return {
        ...productState,
        cart: cart.map((item) =>
          item._id === productAction.payload._id
            ? {
                ...item,
                quantity: item.quantity < 5 ? item.quantity + 1 : item.quantity,
              }
            : item,
        ),
      }
    case 'DECREASE_QUANTITY':
      return {
        ...productState,
        cart: cart.map((item) =>
          item._id === productAction.payload._id
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
              }
            : item,
        ),
      }
  }
}

