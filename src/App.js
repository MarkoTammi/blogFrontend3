

import React, { useState, useEffect } from 'react'

// Components
import DisplayBlogs from './components/DisplayBlogs'
import Login from './components/Login'
import Notification from './components/Notification'
import Logout from './components/Logout'


// Services
import loginServices from './services/login'
import blogServices from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState('')


  // To fetch all blogs before login in not safe. All blogs are visible in
  // devTools/network - sheet 
  useEffect(() => {
    blogServices.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  // useEffect to fetch user-data from browser localStorage if exist. Logout
  // remove user data from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogServices.setToken(user.token)
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

      // Save token to blogServices for createBlog service
      blogServices.setToken(user.token)

      //console.log('user', user)

      // Username and password are cleared because they and token are saved to user.
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('Wrong password or username')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      setUsername('')
      setPassword('')
    }
  }

  // Event handler for logout button
  const handleLogout = () => {
    //console.log('logout clicked')
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
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

      {/* To display error messages for 5sek. */}
      <Notification message={errorMessage} />


      {/* Main content section - login, blogs */}
      {user === null ?

        <Login 
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          /> :
        <DisplayBlogs 
          blogs={blogs}
          />
      }

    </div>
  )
}

export default App