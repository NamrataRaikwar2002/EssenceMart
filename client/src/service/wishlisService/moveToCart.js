import axios from "axios";
import { API_URL } from "../../utilities/constant";

const moveToCart = async (product, token, productDispatch) => {
    const id = product._id;
  try {
    const response = await axios.delete(`${API_URL}/wishlist/${id}`, {
      headers: {
        authorization: token
      },
    })
    console.log(response,'jfwoeiforesponse')
    productDispatch({
      type: 'REMOVE_FROM_WISHLIST',
      payload: response?.data?.user?.products,
    })
  } catch (error) {
    console.error(error)
  }

    try {
    console.log(product, 'product')
    const response = await axios.post(
      `${API_URL}/cart`, {
        product
      }, {
        headers: {
          authorization: token
        },
      },
    )
    console.log(response)
    productDispatch({
      type: 'ADD_TO_CART',
      payload: response.data.user.products
    })
    
    productDispatch({
      type: "MOVE_TO_CART",
      payload: product,
    });
  } catch (error) {
    console.error(error)
  }

};

export { moveToCart };
