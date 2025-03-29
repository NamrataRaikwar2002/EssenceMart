// @ts-nocheck
import React from 'react'
import { useFilter } from '../../../hooks/context/filterContext'

export const Filter = ({ sideBar, setsideBar }) => {
  const { filterState, filterDispatch } = useFilter()
  const {
    priceValue,
    Deodorant,
    Perfume,
    Fragrance,
    BodySpray,
    rating,
    sortBy,
  } = filterState

  return (
    <aside className={sideBar ? 'filters showFilter' : 'filters hideFilter'}>
      <div className="filter_clear_div">
        <h3>Filters</h3>
        <button
          className="filter_clear"
          onClick={() => filterDispatch({ type: 'CLEAR', payload: {} })}
        >
          clear
        </button>
      </div>
      <div className="price_div">
        <h3>Price</h3>
        <div className="price_container">
          <p>₹0 - ₹{priceValue}</p>
        </div>
        <div className="price_slider">
          <input
            type="range"
            min="0"
            max="2000"
            step="100"
            value={priceValue}
            onChange={(e) =>
              filterDispatch({ type: 'PRICE', payload: e.target.value })
            }
          />
        </div>
        <h3>Sort by</h3>
        <div>
          <input
            type="radio"
            name="priceradio"
            checked={sortBy === 'HIGH_TO_LOW'}
            className="price_filer"
            id="price_filter_high"
            onChange={() => filterDispatch({ type: 'HIGH_TO_LOW' })}
          />
          <label htmlFor="price_filter_high"> Price-High to Low</label>
        </div>
        <div>
          <input
            type="radio"
            name="priceradio"
            checked={sortBy === 'LOW_TO_HIGH'}
            className="price_filer"
            id="price_filter_low"
            onChange={() => filterDispatch({ type: 'LOW_TO_HIGH' })}
          />
          <label htmlFor="price_filter_low"> Price-Low to High</label>
        </div>
      </div>
      <div className="product_category">
        <h3>Category</h3>
        <div className="each_category">
          <input
            type="checkbox"
            name="1"
            checked={Deodorant}
            id="deodorant"
            onChange={(e) =>
              filterDispatch({ type: 'DEODORANT', payload: e.target.checked })
            }
          />
          <label htmlFor="deodorant">Deodorants</label>
        </div>
        <div className="each_category">
          <input
            type="checkbox"
            name="1"
            checked={Perfume}
            id="perfumes"
            onChange={(e) =>
              filterDispatch({ type: 'PERFUME', payload: e.target.checked })
            }
          />
          <label htmlFor="perfumes"> Perfumes</label>
        </div>
        <div className="each_category">
          <input
            type="checkbox"
            name="1"
            checked={Fragrance}
            id="fragrance"
            onChange={(e) =>
              filterDispatch({ type: 'FRAGRANCE', payload: e.target.checked })
            }
          />
          <label htmlFor="fragrance"> Fragrance</label>
        </div>
        <div className="each_category">
          <input
            type="checkbox"
            name="1"
            checked={BodySpray}
            id="bodySpray"
            onChange={(e) =>
              filterDispatch({ type: 'BODYSPRAY', payload: e.target.checked })
            }
          />
          <label htmlFor="bodySpray"> Body Spray</label>
        </div>
      </div>
      <div className="price_slider">
        <h3>Ratings</h3>
        <div>
          <input
            type="radio"
            name="1"
            className="price_filter"
            value="4"
            checked={rating === '4'}
            id="4star"
            onChange={(e) =>
              filterDispatch({ type: 'RATING', payload: e.target.value })
            }
          />
          <label htmlFor="4star"> 4 Stars & above</label>
        </div>
        <div>
          <input
            type="radio"
            name="1"
            className="price_filer"
            value="3"
            checked={rating === '3'}
            id="3star"
            onChange={(e) =>
              filterDispatch({ type: 'RATING', payload: e.target.value })
            }
          />
          <label htmlFor="3star"> 3 Stars & above</label>
        </div>
        <div>
          <input
            type="radio"
            name="1"
            className="price_filer"
            value="2"
            checked={rating === '2'}
            id="2star"
            onChange={(e) =>
              filterDispatch({ type: 'RATING', payload: e.target.value })
            }
          />
          <label htmlFor="2star"> 2 Stars & above</label>
        </div>
        <div>
          <input
            type="radio"
            name="1"
            className="price_filer"
            value="1"
            checked={rating === '1'}
            id="1star"
            onChange={(e) =>
              filterDispatch({ type: 'RATING', payload: e.target.value })
            }
          />
          <label htmlFor="1star"> 1 Stars & above</label>
        </div>
      </div>
    </aside>
  )
}

