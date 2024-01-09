import notReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/loginReducer'
import { configureStore } from '@reduxjs/toolkit'





const Store = configureStore({
    reducer: {
    message: notReducer,
    blogs: blogReducer,
    user: userReducer
    }
  })

export default Store