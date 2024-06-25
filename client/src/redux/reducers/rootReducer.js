// rootReducer.js
import handleCart from './cartReducer';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
  handleCart,
});

export default rootReducers;
