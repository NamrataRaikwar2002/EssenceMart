import axios from "axios";
import { API_URL } from "../../utilities/constant";

const moveToWishlist = async (product, token, productDispatch) => {
    const id = product._id;
  try {
    const response = await axios.delete(`${API_URL}/cart/${id}`, {
      headers: {
        authorization: token,
      },
    });
    productDispatch({
      type: "REMOVE_FROM_CART",
      payload: response?.data?.user?.products,
    });
  } catch (error) {
    console.error(error, "error");
  }

  try {
    const response = await axios.post(
      `${API_URL}/wishlist`,
      {
        product,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    productDispatch({
      type: "ADD_TO_WISHLIST",
      payload: response?.data?.user?.products,
    });

    productDispatch({
      type: "MOVE_TO_WISHLIST",
      payload: product,
    });

  } catch (error) {
    console.error(error);
  }
};

export { moveToWishlist };
