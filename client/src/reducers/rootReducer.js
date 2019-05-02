import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import notes from './noteReducer'

export default (initialStore = {}) => {
  const rootReducer = combineReducers({
    notes
  })

  const store = createStore(
    rootReducer,
    initialStore,
    applyMiddleware(reduxThunk)
  );
  return store
}