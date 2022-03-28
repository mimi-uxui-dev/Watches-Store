import { combineReducers } from "redux"
import accountReducer from './accountReducer'

// Our states ex account 
const reducers = combineReducers({
     account: accountReducer
})

export default reducers