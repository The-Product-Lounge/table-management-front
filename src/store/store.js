import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { tableReducer } from './reducers/table.reducer'

const rootReducer = combineReducers({
    tableModule: tableReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
