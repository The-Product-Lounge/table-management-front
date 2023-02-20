import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux'
import thunk from 'redux-thunk'
import { tableReducer } from './reducers/table.reducer'
import { userReducer } from './reducers/user.reducer'

const rootReducer = combineReducers({
  tableModule: tableReducer,
  userModule: userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
