// @ts-nocheck
import './Home.css'
import { Fotter, Navbar } from '../../components'
import {
  bodySprayImg,
  deodorantImg,
  fragranceImg,
  landingImg,
  newfoggImg,
  newKsImg,
  newsecretImg,
  perfumeImg,
} from '../../assets'
import { LandingFeature } from './component/LandingFeature'
import { NewArrival } from './component/NewArrival'

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="home_section content">
        <div className="landing_area">
          <img src={landingImg} alt="landing image" className="landing_img" />
        </div>

        <h2 className="newoffer_heading">Deal of the day</h2>
        <div className="all_features">
          <LandingFeature
            key="1"
            featureCardImg={deodorantImg}
            featureCardName="Deodorants"
          />

          <LandingFeature
            key="2"
            featureCardImg={bodySprayImg}
            featureCardName="Body Spray"
          />

          <LandingFeature
            key="3"
            featureCardImg={perfumeImg}
            featureCardName="Perfume"
          />

          <LandingFeature
            key="4"
            featureCardImg={fragranceImg}
            featureCardName="Fragrance"
          />
        </div>
        <h1 className="newoffer_heading">New Offers</h1>

        <div className="new_offers_div">
          <NewArrival
            newArrivalImg={newfoggImg}
            productText="FOGG 1 Royal and 1 Napoleon Deodorant"
            productName="Fogg"
            mrp="₹289"
            preMrp="₹500"
            discount="39% off"
          />
          <NewArrival
            newArrivalImg={newKsImg}
            productText="Kamasutra Spark Power series Body Spray - For Men & Women "
            productName="Kamasutra Spark"
            mrp="₹189"
            preMrp="₹300"
            discount="49% off"
          />
          <NewArrival
            newArrivalImg={newsecretImg}
            productText="secret temptation Body Mist - For Women "
            productName="Secret"
            mrp="₹310"
            preMrp="₹600"
            discount="54% off"
          />
        </div>
      </section>
      <Fotter />
    </>
  )
}

export { Home }

