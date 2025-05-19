import axios from 'axios';
import {
  API_URL
} from '../../utilities/constant';


const updateCart = async (product, token, productDispatch) => {
    const id = product._id;
    const quantity = product.quantity
  try {
    console.log(product, 'product')
    const response = await axios.post(
      `${API_URL}/cart/${id}`, {
        product
      }, {
        headers: {
          authorization: token
        },
      },
    )
    console.log(response,'hereitisthre')
    // productDispatch({
    //   type: 'ADD_TO_CART',
    //   payload: response.data.user.products
    // })
     productDispatch({
       type: "INCREASE_QUANTITY",
       payload: { _id: id, quantity: quantity },
     });
  } catch (error) {
    console.error(error)
  }
}
export {
  updateCart
}
