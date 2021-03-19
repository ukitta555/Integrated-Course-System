import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import  {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from '../reducers/userReducer/userReducer'
import loginReducer from '../reducers/loginReducer'


const reducer = combineReducers(
    {
        user: userReducer,
        login: loginReducer
    }
)

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export type RootState = ReturnType<typeof reducer>
export default store