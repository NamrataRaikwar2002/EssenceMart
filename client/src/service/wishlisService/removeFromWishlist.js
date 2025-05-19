import axios from 'axios'
import { API_URL } from "../../utilities/constant";

const removeFromWishlist = async (_id, token, productDispatch) => {
  try {
    const response = await axios.delete(`${API_URL}/wishlist/${_id}`, {
      headers: {
        authorization: token
      },
    })
    productDispatch({
      type: 'REMOVE_FROM_WISHLIST',
      payload: response?.data?.user?.products,
    })
  } catch (error) {
    console.error(error)
  }
}

export {
  removeFromWishlist
}
