import axios from 'axios'
import { API_URL } from "../../utilities/constant";

const removeFromCart = async (_id, token, productDispatch) => {
  try {
    const response = await axios.delete(`${API_URL}/cart/${_id}`, {
      headers: {
        authorization: token
      },
    })
    productDispatch({
      type: 'REMOVE_FROM_CART',
      payload: response?.data?.user?.products
    })
  } catch (error) {
    console.error(error)
  }
}

export {
  removeFromCart
}
