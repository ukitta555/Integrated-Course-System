import {createStore, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import  {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from '../reducers/userReducer/userReducer'
import loginReducer from '../reducers/loginReducer'

export default function configureStore() {
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
    return store
}
