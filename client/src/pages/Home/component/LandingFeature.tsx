// @ts-nocheck
import { Link } from 'react-router-dom'
import { useFilter } from '../../../hooks/context/filterContext'

const LandingFeature = ({ featureCardImg, featureCardName }) => {
  const { filterState, filterDispatch } = useFilter()
  const { Deodorant, Perfume, Fragrance, BodySpray } = filterState;

  const featureCategoryHandler = () => {
    if (featureCardName === 'Deodorants') {
      filterDispatch({ type: 'CLEAR_CATEGORY' })
      filterDispatch({ type: 'DEODORANT', payload: true })
    }
    if (featureCardName === 'Perfume') {
      filterDispatch({ type: 'CLEAR_CATEGORY'})
      filterDispatch({ type: 'PERFUME', payload: true  })
    } 
    if (featureCardName === 'Body Spray') {
      filterDispatch({ type: 'CLEAR_CATEGORY' })
      filterDispatch({ type: 'BODYSPRAY', payload: true  })
    }
    if (featureCardName === 'Fragrance') {
      filterDispatch({ type: 'CLEAR_CATEGORY' })
      filterDispatch({ type: 'FRAGRANCE', payload: true  })
    }
  }
  return (
    <Link to={'/product-list'} onClick={featureCategoryHandler}>
      <div className="home_features">
        <img className="featureImg" src={featureCardImg} alt="image" />
        <button className="card_btn addto_cart">{featureCardName}</button>
      </div>
    </Link>
  )
}

export { LandingFeature }

