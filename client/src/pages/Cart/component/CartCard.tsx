// @ts-nocheck
import React from 'react'
import { useProduct } from '../../../hooks/context/productContext'
import { removeFromCart } from '../../../service/cartService/removeFromCart'
import { moveToWishlist } from '../../../service/cartService/moveToWishlist'
import { updateCart } from '../../../service/cartService/updateCart'

import { useAuth } from '../../../hooks/context/authContext'

export const CartCard = () => {
  const { productState, productDispatch } = useProduct()
  const { cart } = productState
  const {
    userDetail: { token },
  } = useAuth()

  const removeFromCartHandler = (_id) => {
    removeFromCart(_id, token, productDispatch)
  }

  const moveToWishlistHandler = (product) => {
    moveToWishlist(product, token, productDispatch)
  }

  const updateCartProduct = (product) => {
    updateCart(product, token, productDispatch)
  }

  return (
    <>
      {cart.map(
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
            <div className="horizontal_card cartHorizontalCard" key={_id}>
              <section className="horizontal_img_section">
                <img className="img1 horizontal_img" src={productImg} />
                <div className="card_title horizontal_text">
                  <h3 className="heading">{title}</h3>
                  <div className="mrp">
                    <h3>₹{price}</h3>
                    <s>₹{prePrice}</s>
                  </div>
                  <p className="green">{discount}</p>
                  <small className="quantity_div">
                    Quantity:
                    <button
                      className="quantity_btn decrease_btn"
                      onClick={() =>
                        productDispatch({
                          type: "DECREASE_QUANTITY",
                          payload: { _id: _id, quantity: quantity },
                        })
                      }
                    >
                      -
                    </button>
                    <p className="quantity_input">{quantity}</p>
                    <button
                      className="quantity_btn"
                      onClick={
                        () =>
                          updateCartProduct({
                            productImg,
                            price,
                            title,
                            prePrice,
                            rating,
                            discount,
                            quantity,
                            _id,
                          })
                        // productDispatch({
                        //   type: 'INCREASE_QUANTITY',
                        //   payload: { _id: _id, quantity: quantity },
                        // })
                      }
                    >
                      +
                    </button>
                  </small>
                  <button
                    className="horizontal_cart_btn"
                    onClick={() => removeFromCartHandler(_id)}
                  >
                    Remove From Cart
                  </button>
                  <button
                    className="e_com_btn wishlist_btn"
                    onClick={() =>
                      moveToWishlistHandler({
                        productImg: productImg,
                        price: price,
                        title: title,
                        prePrice: prePrice,
                        discount: discount,
                        rating: rating,
                        _id: _id,
                      })
                    }
                  >
                    Move to Wishlist
                  </button>
                </div>
              </section>
            </div>
          );
        },
      )}
    </>
  )
}

