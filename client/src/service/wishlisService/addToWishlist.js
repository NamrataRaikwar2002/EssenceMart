import axios from 'axios'
import { API_URL } from '../../utilities/constant'

const addToWishlist = async (product, token, productDispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/wishlist`,
      { product },
      { headers: { authorization: token } },
    )
    productDispatch({
      type: 'ADD_TO_WISHLIST',
      payload: response.data.user.products,
    })
  } catch (error) {
    console.error(error)
  }
}
export { addToWishlist }
