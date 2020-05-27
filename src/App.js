

import React, { useState, useEffect } from 'react'
import { useDispatch} from 'react-redux'
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
import { setClearNotification} from './reducers/notificationReducer'


const App = () => {

  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  //const [displayMessage, setDisplayMessage] = useState('')

   // useState for create new blog
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [createNewBlogVisible, setCreateNewBlogVisible] = useState(false)

  const [viewBlogDetails, setViewBlogDetails] = useState(null)

  // useEffect to fetch user-data from browser localStorage if exist. 
  // Logout removes user data from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      // Set token to blogService-token variable for backend communication purpose
      blogServices.setToken(user.token)

      blogServices.getAll()
        .then(blogs => setBlogs( blogs )
      )  
    } 
  }, [])


  // Event handler for login button
  const handleLogin = async (event) => {    
    event.preventDefault()
    try {
      //console.log('logging in with', username, password)  
      const user = await loginServices.login( { username, password } )
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogServices.setToken(user.token)

      // Username and password are cleared because they and token are saved to user object.
      setUsername('')
      setPassword('')

      setCreateNewBlogVisible(false)
      setViewBlogDetails(null)

      // All blogs are fetched from backend after succesfull login
      const initialBlogs = await blogServices.getAll()
      setBlogs(initialBlogs)

    } catch {
      // Display login failed message
      const msgToDisplay = 'Wrong password or username'
      // content to display, time in sec to display
      dispatch(setClearNotification(msgToDisplay, 5, timeoutId))

/*       setDisplayMessage('Wrong password or username')
      setTimeout(() => {
        setDisplayMessage('')
      }, 5000) */
      setUsername('')
      setPassword('')
    }
  }

  // Event handler for logout button
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

// Event handler for creat new blog button
// creates new blog to backend
const handleCreateNew = async (event) => {
  event.preventDefault()
  const newBlog = {
    "title" : newTitle, 
    "author" : newAuthor, 
    "url" :newUrl,
    "likes" : 0
  }
  try {

      // const newBlg = await blogServices.createNew( newBlog )  
      //setBlogs(blogs.concat(newBlg))

      await blogServices.createNew( newBlog )
      const initialBlogs = await blogServices.getAll()
      setBlogs(initialBlogs)

      // Display name of created anecdote in notification field
      const msgToDisplay = `A new blog ${newTitle} by ${newAuthor} added`
      // content to display, time in sec to display
      dispatch(setClearNotification(msgToDisplay, 5, timeoutId))

/*       setDisplayMessage(`A new blog ${newTitle} by ${newAuthor} added`)
      setTimeout(() => {
        setDisplayMessage('')
      }, 5000) */
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
  } catch {
      console.log('handleCreateNew catch')
  }
}

// Event handler for "cancel and close" new blog button
const handleCancelNewBlog = (event) => {
    event.preventDefault()
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setCreateNewBlogVisible(false)
}

// Event handler for inputing blog title.
const handleNewTitleInput = (event) => {
    setNewTitle(event.target.value)  
}

// Event handler for inputing blog author.
const handleNewAuthorInput = (event) => {
    setNewAuthor(event.target.value)  
}

// Event handler for inputing blog url.
const handleNewUrlInput = (event) => {
    setNewUrl(event.target.value)  
}

// Event handler for delete blog button
const handleDelete = async (blog) => {

  if (window.confirm(`Delete blog "${blog.title}" ?`)) {
    try {
      await blogServices.deleteBlog( blog.id )

      // Update all blogs table
      const initialBlogs = await blogServices.getAll()
      setBlogs(initialBlogs)

      // Display delete confirm message to user
      const msgToDisplay = `Blog title "${blog.title}" removed`
      // content to display, time in sec to display
      dispatch(setClearNotification(msgToDisplay, 5, timeoutId))

/*       setDisplayMessage(`Blog title "${blog.title}" removed`)
      setTimeout(() => {
        setDisplayMessage('')
      }, 5000) */
    } catch{
      console.log('handleDelete catch')
    }
  }
}

// Event handler for view blog details button
const handleViewBlogDetails = (event) => {
  setViewBlogDetails(event.id)

}

// Event handler for close blog details button
const handleCloseBlogDetails = () => {
  setViewBlogDetails(null)
}

// Event handler for like blog button
const handleLikeBlog = async (event) => {
  //event.preventDefault()
  event.likes = event.likes + 1
  const updateBlog = {
    "title" : event.title, 
    "author" : event.author, 
    "url" : event.url,
    "likes" : event.likes,
    "user" : event.user.id,
    "id" : event.id
  }
  try {
    await blogServices.updateBlog( updateBlog )

    const initialBlogs = await blogServices.getAll()
    setBlogs(initialBlogs)
  } catch {
    console.log('handleLikeBlog catch')
  }
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
            {user !== null && <Logout user={user} handleLogout={handleLogout}/>}
          </div>
        </div>
      </div>
      </header>

      {/* To display notification messages for 5sek. */}
      <Notification />
      {/* <Notification message={displayMessage} />
 */}

      {/* Main content section - login, blogs */}
      {user === null ?

        // Display login-form if user is not logged in
        <Login 
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          /> :
        
        // Display createNewBlog and allBlogs if user is logged in
        <div>
          <CreateNew 
            handleCreateNew={handleCreateNew}
            handleCancelNewBlog={handleCancelNewBlog}
            newTitle={newTitle} 
            handleNewTitleInput={handleNewTitleInput}
            newAuthor={newAuthor} 
            handleNewAuthorInput={handleNewAuthorInput}
            newUrl={newUrl}
            handleNewUrlInput={handleNewUrlInput}
            createNewBlogVisible={createNewBlogVisible}
            setCreateNewBlogVisible={setCreateNewBlogVisible}
            />

          <DisplayBlogs 
            blogs={blogs}
            handleDelete={handleDelete}
            user={user}
            viewBlogDetails={viewBlogDetails}
            handleViewBlogDetails={handleViewBlogDetails}
            handleCloseBlogDetails={handleCloseBlogDetails}
            handleLikeBlog={handleLikeBlog}
            />
        </div>
      }

    </div>
  )
}

export default App