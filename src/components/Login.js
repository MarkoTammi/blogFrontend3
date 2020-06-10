// Login component

import React from 'react'
import { useDispatch } from 'react-redux'

import { actionLogin } from '../reducers/userReducer'
import { actionInitializeBlogs } from '../reducers/blogsReducer'


const Login = (props) => {

    const dispatch = useDispatch()

    // Event handler for login button
    const handleLoginButton = async (event) => {
        event.preventDefault()
        //console.log('handleLoginButton')
        const newUser = {
            username: event.target.Username.value,
            password: event.target.Password.value,
        }
        event.target.Username.value = ''
        event.target.Password.value = ''
        //console.log('newBlog', newUser)

        try {
            // Login
            // Backend login and save to user to store and browser local storage
            dispatch(actionLogin(newUser))

            // Fetch all blogs
            dispatch(actionInitializeBlogs())

        } catch {
            console.log('handleLogin catch')
        }

    }


    return (
        <div className="text-center mt-5">
            <form className="form-group" onSubmit={handleLoginButton}>
                <h5 className="font-weight-normal" >Please log in</h5>
                <div>
                    <input
                        className="form-control"
                        placeholder="Username"
                        type = "text"
                        name="Username"
                    />
                </div>
                <div>
                    <input
                        className="form-control"
                        placeholder="Password"
                        type = "password"
                        name="Password"
                    />
                </div>
                <button id="login-button" className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login