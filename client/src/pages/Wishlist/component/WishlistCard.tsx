// @ts-nocheck
import React from 'react'
import { useProduct } from '../../../hooks/context/productContext'
import { removeFromWishlist } from '../../../service/wishlisService/removeFromWishlist'
import { useAuth } from '../../../hooks/context/authContext'
export const WishlistCard = () => {
  const { productState, productDispatch } = useProduct()
  const { wishList } = productState
  const {
    userDetail: { token },
  } = useAuth()

  const removeWishlistHandler = (_id) => {
    removeFromWishlist(_id, token, productDispatch)
  }
  return (
    <>
      {wishList.map(
        ({
          productImg,
          price,
          title,
          prePrice,
          rating,
          discount,
          quantity,
          _id,
        }) => {
          return (
            <div className="product_list_item" key={_id}>
              <img className="productListImg" src={productImg} alt="images" />
              <div className="card_detail">
                <button
                  className="wishlist_icon"
                  onClick={() => removeWishlistHandler(_id)}
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
                <p>{title}</p>
                <div className="mrpdiv">
                  <h3>₹{price}</h3>
                  <s>₹{prePrice}</s>
                </div>
                <div className="discountRating">
                  <p className="green">{discount}</p>
                  <p className="ratingStarPara">
                    {rating}
                    <i className="fas fa-star star_icon"></i>
                  </p>
                </div>
              </div>
              <button
                className="card_btn primary_selected_btn productAddToCartbtn"
                onClick={() =>
                  productDispatch({
                    type: 'MOVE_TO_CART',
                    payload: {
                      productImg: productImg,
                      price: price,
                      title: title,
                      prePrice: prePrice,
                      discount: discount,
                      rating: rating,
                      quantity: quantity,
                      _id: _id,
                    },
                  })
                }
              >
                Move to Cart
              </button>
            </div>
          )
        },
      )}
    </>
  )
}

