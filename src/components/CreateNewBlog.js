

// Component to create new blog

import React, {} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeoutId } from '../global'

import { actionSetClearNotification } from '../reducers/notificationReducer'
import { actionCreateNewBlog } from '../reducers/blogsReducer'


const CreateNewBlog = (props) => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

      // Event handler for create button
    const handleCreateBlogButton = async (event) => {
        event.preventDefault()
        
        const newBlog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value,
            user: user
        }
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
        //console.log('newBlog', newBlog)

        try {
            // Save new blog to Mongo and state
            dispatch(actionCreateNewBlog(newBlog, user))

            // Display name of created anecdote in notification field
            const msgToDisplay = 'You create "' + newBlog.title + '" blog'
            // content to display, time in sec to display
            dispatch(actionSetClearNotification(msgToDisplay, 5, timeoutId))  
        } catch {
            console.log('handleCreateBlogButton catch')
        }
    }

    // to show createNewBlog form or not
    // CSS property 'display' is none or ''
    const hideWhenVisible = { display : props.createNewBlogVisible ? 'none': '' }
    const showWhenVisible = { display : props.createNewBlogVisible ? '' : 'none' }


    return (
        <div>
            <div style={hideWhenVisible}>
                <button className="btn btn-outline-secondary btn-sm mt-4" onClick={ () => props.setCreateNewBlogVisible(true)}>Create new blog</button>
            </div>
            <div style={showWhenVisible}>
                <h6 className="mt-4">Create new blog</h6>
                <form className="form-group" onSubmit={handleCreateBlogButton}>
                    <input id="blogTitle" className="form-control" placeholder="Title" name="title"/>
                    <input id="blogAuthor" className="form-control" placeholder="Author" name="author"/>
                    <input id="blogUrl" className="form-control" placeholder="Url" name="url"/>
                    <div className="mt-2"> 
                        <button id="createButton" className="btn btn-primary btn-sm" type="submit">Create</button>
                        <button className="btn btn-outline-secondary btn-sm ml-2" onClick={props.handleCancelNewBlog}>Cancel and close form</button> 
                    </div>
                </form>
            </div>
        </div>
    )
}


export default CreateNewBlog