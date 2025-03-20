import axios from 'axios'

const addToWishlist = async (product, token, productDispatch) => {
  try {
    const response = await axios.post(
      '/api/user/wishlist',
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
