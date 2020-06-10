

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeoutId } from './global'

// Components
import DisplayBlogs from './components/DisplayBlogs'
import Login from './components/Login'
import Notification from './components/Notification'
import Logout from './components/Logout'
import CreateNew from './components/CreateNewBlog'


// Services
import blogServices from './services/blogs'

// Reducers
import { actionSetClearNotification} from './reducers/notificationReducer'
import { actionInitializeBlogs } from './reducers/blogsReducer'
import { actionSetUser } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()

  const [createNewBlogVisible, setCreateNewBlogVisible] = useState(false)
  const [viewBlogDetails, setViewBlogDetails] = useState(null)

  // useEffect to fetch user-data from browser localStorage if exist. 
  // Logout removes user data from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(actionSetUser(user))

      // Set token to blogService-token variable for backend communication purpose
      blogServices.setToken(user.token)

      dispatch(actionInitializeBlogs())

      // Display welcome message
      const msgToDisplay = `Nice to see you again ${user.username}!`
      // content to display, time in sec to display
      dispatch(actionSetClearNotification(msgToDisplay, 5, timeoutId))
    } 
  }, [dispatch])

  const user = useSelector(state => state.user)

// Event handler for "cancel and close" new blog button
const handleCancelNewBlog = (event) => {
    event.preventDefault()
    setCreateNewBlogVisible(false)
}

// Event handler for view blog details button
const handleViewBlogDetails = (event) => {
  setViewBlogDetails(event.id)

}

// Event handler for close blog details button
const handleCloseBlogDetails = () => {
  setViewBlogDetails(null)
}

  return (
    <div>

      {/* Header section */}
      <header>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h3>Great blogs</h3>
          </div>
          <div className="col-6">
            {user !== '' && <Logout />}
          </div>
        </div>
      </div>
      </header>

      {/* To display notification messages */}
      <Notification />

      {/* Main content section - login, blogs */}
      { user === '' ?

        // Display login-form if user is not logged in
        <Login /> 
        :
        // Display createNewBlog and allBlogs if user is logged in
        <div>
          <CreateNew 
            handleCancelNewBlog={handleCancelNewBlog}
            createNewBlogVisible={createNewBlogVisible}
            setCreateNewBlogVisible={setCreateNewBlogVisible}
            />

          <DisplayBlogs 
            viewBlogDetails={viewBlogDetails}
            handleViewBlogDetails={handleViewBlogDetails}
            handleCloseBlogDetails={handleCloseBlogDetails}
            />
        </div>
      }

    </div>
  )
}

export default App