import notReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/loginReducer'
import usersReducer from './reducers/userReducer'
import { configureStore } from '@reduxjs/toolkit'





const Store = configureStore({
    reducer: {
    message: notReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer
    }
  })

export default Store