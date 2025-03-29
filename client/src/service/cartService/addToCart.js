import axios from 'axios';
import { API_URL } from '../../utilities/constant';


const addToCart = async (product, token, productDispatch) => {
  try {
    console.log(product,'product')
    const response = await axios.post(
      `${API_URL}/cart`,
      { product },
      {
        headers: { authorization: token },
      },
    )
    console.log(response)
    productDispatch({ type: 'ADD_TO_CART', payload: response.data.user.products })
  } catch (error) {
    console.error(error)
  }
}
export { addToCart }
