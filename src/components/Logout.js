

// Logout component

import React from 'react'
import { timeoutId } from '../global'
import { useSelector, useDispatch } from 'react-redux'

import { actionLogout } from '../reducers/userReducer'
import { actionSetClearNotification } from '../reducers/notificationReducer'
import { actionClearBlogsStore } from '../reducers/blogsReducer'

const Logout = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogout = () => {
        //console.log('handleLogout')
        dispatch(actionLogout())
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch(actionClearBlogsStore())

        // Display exit message
        const msgToDisplay = 'Googbye'
        // content to display, time in sec to display
        dispatch(actionSetClearNotification(msgToDisplay, 5, timeoutId))
    }

    return (
        <div className="">
            <button id="logout-button" onClick={ () => handleLogout() } type="submit" className="btn btn-outline-info btn-sm">{user.username} - LOGOUT</button>
        </div>
    )
}

export default Logout