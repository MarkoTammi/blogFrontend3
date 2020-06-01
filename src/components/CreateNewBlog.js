

// Component to create new blog

import React, {} from 'react'
import { useDispatch } from 'react-redux'
import { timeoutId } from '../global'

import { setClearNotification } from '../reducers/notificationReducer'
import { createNewBlog } from '../reducers/blogsReducer'


const CreateNewBlog = (props) => {

    const dispatch = useDispatch()


      // Event handler for create button
    const handleCreateBlogButton = async (event) => {
        event.preventDefault()
        console.log('handleCreateBlogButton')
        const newBlog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value,
            user: props.user
        }
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
        console.log('newBlog', newBlog)

        try {
            // Save new blog to Mongo and state
            dispatch(createNewBlog(newBlog, props.user))

            // Display name of created anecdote in notification field
            const msgToDisplay = 'You create "' + newBlog.title + '" blog'
            // content to display, time in sec to display
            dispatch(setClearNotification(msgToDisplay, 5, timeoutId))  
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

/*     return (
        <div>
            <div style={hideWhenVisible}>
                <button className="btn btn-outline-secondary btn-sm mt-4" onClick={ () => props.setCreateNewBlogVisible(true)}>Create new blog</button>
            </div>
            <div style={showWhenVisible}>
                <h6 className="mt-4">Create new blog</h6>
                <form className="form-group" onSubmit={props.handleCreateNew}>
                    <input id="blogTitle" className="form-control" placeholder="Title" value={props.newTitle} onChange={props.handleNewTitleInput}/>
                    <input id="blogAuthor" className="form-control" placeholder="Author" value={props.newAuthor} onChange={props.handleNewAuthorInput}/>
                    <input id="blogUrl" className="form-control" placeholder="Url" value={props.newUrl} onChange={props.handleNewUrlInput}/>
                    <div className="mt-2"> 
                        <button id="createButton" className="btn btn-primary btn-sm" type="submit">Create</button>
                        <button className="btn btn-outline-secondary btn-sm ml-2" onClick={props.handleCancelNewBlog}>Cancel and close form</button> 
                    </div>
                </form>
            </div>
        </div>
    ) */
}


export default CreateNewBlog