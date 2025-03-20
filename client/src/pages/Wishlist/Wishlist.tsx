// @ts-nocheck
import React from 'react'
import { emptyWishlist } from '../../assets'
import { Navbar } from '../../components'
import './Wishlist.css'
import { WishlistCard } from './component/WishlistCard'
import { useProduct } from '../../hooks/context/productContext'
import { Link } from 'react-router-dom'

export const Wishlist = () => {
  const { productState } = useProduct()
  const { wishList } = productState

  return (
    <main className="wishlist_page">
      <Navbar />

      <section className="wishlist_products content">
        <div className="wishlist_products_div">
          <h2 className="productHeading">MY WISHLIST({wishList.length})</h2>
          {wishList.length >= 1 ? (
            <div className="all_wishlist_products">
              <WishlistCard />
            </div>
          ) : (
            <div className="emptycartDiv">
              <>
                <img
                  src={emptyWishlist}
                  alt="empty Wishlist"
                  className="emptyCartImg"
                />
                <p>
                  <Link to="/product-list">
                    <button className="card_btn">Shop Now</button>
                  </Link>
                </p>
              </>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

