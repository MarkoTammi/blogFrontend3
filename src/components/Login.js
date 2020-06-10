// Login component

import React from 'react'
import { timeoutId } from '../global'
import { useSelector, useDispatch } from 'react-redux'

import blogServices from '../services/blogs'

import { actionLogin } from '../reducers/userReducer'
import { actionSetClearNotification } from '../reducers/notificationReducer'
import { actionInitializeBlogs } from '../reducers/blogsReducer'


const Login = (props) => {

    const dispatch = useDispatch()

    //const user = useSelector(state => state.user)



    // Event handler for login button
    const handleLoginButton = async (event) => {
        event.preventDefault()
        console.log('handleLoginButton')
        const newUser = {
            username: event.target.Username.value,
            password: event.target.Password.value,
        }
        event.target.Username.value = ''
        event.target.Password.value = ''
        console.log('newBlog', newUser)

        try {
            // Login
            // Backend login and save to user to store and browser local storage
            dispatch(actionLogin(newUser))

/*             console.log('Login - user', user)
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogServices.setToken(user.token)
            console.log('setToken',user.token)
            // Display name of created anecdote in notification field
            const msgToDisplay = 'Welcome "' + user.username + '" blog apps'
            // content to display, time in sec to display
            dispatch(actionSetClearNotification(msgToDisplay, 5, timeoutId))   */

            // Fetch all blogs
            dispatch(actionInitializeBlogs())

        } catch {
            console.log('handleLogin catch')
        }

    }


    return (
        <div className="text-center mt-5">
            <form className="form-group" onSubmit={handleLoginButton}>
            {/* <form className="form-group" onSubmit={props.handleLogin}> */}
                <h5 className="font-weight-normal" >Please log in</h5>
                <div>
                    <input
                        className="form-control"
                        placeholder="Username"
                        type = "text"
                        // value={props.username}
                        name="Username"
                        // onChange={ ( { target } ) => props.setUsername(target.value) }
                    />
                </div>
                <div>
                    <input
                        className="form-control"
                        placeholder="Password"
                        type = "password"
                        // value={props.password}
                        name="Password"
                        // onChange={ ( { target } ) => props.setPassword(target.value) }
                    />
                </div>
                <button id="login-button" className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login