import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/rootReducer'
import { selectSubreddit, fetchPostsIfNeeded } from './actions/actions'



const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

window.store = store

// store.dispatch(selectSubreddit('reactjs'))
// store.dispatch(fetchPostsIfNeeded('reactjs')).then(() => console.log(store.getState()))

export default store;