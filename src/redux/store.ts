import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// Redux-ducks
import users from './users'
import recorder from './recorder'

const rootReducer = combineReducers({ users, recorder })

const initialState = {}
const middleware = [logger, thunk]
const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
export type RootState = ReturnType<typeof rootReducer>
