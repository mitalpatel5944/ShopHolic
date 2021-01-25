import { createStore } from 'redux'
import cartItemsReducer from './Reducer'

const store = createStore(cartItemsReducer)

export default store;