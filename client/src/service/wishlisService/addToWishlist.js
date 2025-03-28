import axios from 'axios'

const addToWishlist = async (product, token, productDispatch) => {
  try {
    const response = await axios.post(
      `/wishlist/${product._id}`,
      { product },
      { headers: { authorization: token } },
    )
    productDispatch({
      type: 'ADD_TO_WISHLIST',
      payload: response.data.wishlist,
    })
  } catch (error) {
    console.error(error)
  }
}
export { addToWishlist }
