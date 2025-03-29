// @ts-nocheck

import { useReducer, createContext, useContext } from 'react'
import { filterReducer } from '../reducer/filterReducer'

const filterContext = createContext(null)

const FilterProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    priceValue: 2000,
    sortBy: '',
    rating: '',
    Deodorant: false,
    Perfume: false,
    Fragrance: false,
    BodySpray: false,
  })
  return (
    <filterContext.Provider value={{ filterState, filterDispatch }}>
      {children}
    </filterContext.Provider>
  )
}
const useFilter = () => useContext(filterContext)

export { FilterProvider, useFilter }

