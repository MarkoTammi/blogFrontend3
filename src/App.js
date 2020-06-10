

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
import loginServices from './services/login'
import blogServices from './services/blogs'

// Reducers
import { actionSetClearNotification} from './reducers/notificationReducer'
import { actionInitializeBlogs } from './reducers/blogsReducer'
import { actionSetUser, actionClearUser } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()

  //const [blogs, setBlogs] = useState([])

  //const [username, setUsername] = useState('')   
  //const [password, setPassword] = useState('') 
  //const [user, setUser] = useState(null)
  const [createNewBlogVisible, setCreateNewBlogVisible] = useState(false)
  const [viewBlogDetails, setViewBlogDetails] = useState(null)

  //const [displayMessage, setDisplayMessage] = useState('')
  // useState for create new blog
  // const [newTitle, setNewTitle] = useState('')
  // const [newAuthor, setNewAuthor] = useState('')
  // const [newUrl, setNewUrl] = useState('')


  // useEffect to fetch user-data from browser localStorage if exist. 
  // Logout removes user data from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(actionSetUser(user))
      //setUser(user)

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
  console.log('App - user', user)

  // Event handler for login button
/*   const handleLogin = async (event) => {    
    event.preventDefault()
    try {
      //console.log('logging in with', username, password)  
      const user = await loginServices.login( { username, password } )
      dispatch(actionSetUser(user))
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogServices.setToken(user.token)
      // user - token, username, name
      console.log('handleLogin - user', user)
      // Username and password are cleared because they and token are saved to user object.
      setUsername('')
      setPassword('')

      setCreateNewBlogVisible(false)
      setViewBlogDetails(null)

      // All blogs are fetched from backend after succesfull login
      //const initialBlogs = await blogServices.getAll()
      dispatch(actionInitializeBlogs())

    } catch {
      // Display login failed message
      const msgToDisplay = 'Wrong password or username'
      // content to display, time in sec to display
      dispatch(actionSetClearNotification(msgToDisplay, 5, timeoutId))

/*       setDisplayMessage('Wrong password or username')
      setTimeout(() => {
        setDisplayMessage('')
      }, 5000)
      setUsername('')
      setPassword('')
    }
  } */

  // Event handler for logout button
/*   const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(actionClearUser())
    //setUser(null)
  } */

// Event handler for "cancel and close" new blog button
const handleCancelNewBlog = (event) => {
    event.preventDefault()
    //setNewTitle('')
    //setNewAuthor('')
    //setNewUrl('')
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
        <Login 
/*           handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword} */
          /> :
          
        
        // Display createNewBlog and allBlogs if user is logged in
        <div>
          <CreateNew 
            // handleCreateNew={handleCreateNew}
            handleCancelNewBlog={handleCancelNewBlog}
            //user={user}
            /* newTitle={newTitle} 
            handleNewTitleInput={handleNewTitleInput}
            newAuthor={newAuthor} 
            handleNewAuthorInput={handleNewAuthorInput}
            newUrl={newUrl}
            handleNewUrlInput={handleNewUrlInput} */
            createNewBlogVisible={createNewBlogVisible}
            setCreateNewBlogVisible={setCreateNewBlogVisible}
            />

          <DisplayBlogs 
            //blogs={blogs}
            // handleDelete={handleDelete}
            //user={user}
            viewBlogDetails={viewBlogDetails}
            handleViewBlogDetails={handleViewBlogDetails}
            handleCloseBlogDetails={handleCloseBlogDetails}
            // handleLikeBlog={handleLikeBlog}
            />
        </div>
      }

    </div>
  )
}

export default App