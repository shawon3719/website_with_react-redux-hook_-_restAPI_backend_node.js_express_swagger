import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const initialState = {
  sidebarShow: 'responsive'
}
const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case 'set':
        return {...state, ...rest }
      default:
        return state
    }
  }

// const loggerMiddleware = createLogger();

export const store = createStore(
   
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    )
);