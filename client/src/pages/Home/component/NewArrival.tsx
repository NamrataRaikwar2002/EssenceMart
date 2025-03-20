// @ts-nocheck
import React from 'react'
import {Link} from 'react-router-dom'

const NewArrival = ({
  newArrivalImg,
  productText,
  productName,
  mrp,
  preMrp,
  discount,
}) => {
  return (
    <div className="horizontal_card homeHrizontalCard" id="newArrivalDiv">
      <section className="horizontal_img_section">
        <img className="img1 horizontal_img" src={newArrivalImg} alt="image" />
        <div className="card_title horizontal_text">
          <h3 className="heading">{productName}</h3>
          <p>{productText}</p>
          <div className="mrpdiv">
            <h3>{mrp}</h3>
            <s>{preMrp}</s>
          </div>
          <p className="green">{discount}</p>
          <Link to='/product-list'><button className="card_btn">Shop Now</button></Link> 
        </div>
      </section>
    </div>
  )
}

export { NewArrival }

