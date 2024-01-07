import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notReducer from './reducers/notificationReducer'



const Store = configureStore({
    reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    message: notReducer
    }
  })

export default Store
  