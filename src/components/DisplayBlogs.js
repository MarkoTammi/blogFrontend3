
// Component to display all blogs

import React, { } from 'react'
import { timeoutId } from '../global'
import { useSelector, useDispatch } from 'react-redux'


import { actionBlogVoted, actionDeleteBlog } from '../reducers/blogsReducer'
import { actionSetClearNotification } from '../reducers/notificationReducer'


const DisplayBlogs = (props) => {
  
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)

  // Handler for blog Delete button
  const handleDeleteButton = (blog) => {
    if (window.confirm(`Delete blog "${blog.title}" ?`)) {
      try {
        dispatch(actionDeleteBlog(blog))
        // Display delete confirm message to user
        const msgToDisplay = `Blog title "${blog.title}" removed`
        // Content to display, time in sec to display
        dispatch(actionSetClearNotification(msgToDisplay, 5, timeoutId))
      } catch{
        console.log('handleDeleteButton catch')
      }
    }
  }

    // Handler for blog Like button
    const handleLikeButton = (blog) => {
        try {
          dispatch(actionBlogVoted(blog, loggedUser))
          // Display delete confirm message to user
          const msgToDisplay = `You voted blog : "${blog.title}"`
          // Content to display, time in sec to display
          dispatch(actionSetClearNotification(msgToDisplay, 5, timeoutId))
        } catch{
          console.log('handleLikeButton catch')
        }
    }
    

  const blogs = useSelector(state => state.blogs)
  // Sort blogs by "likes". Most likes is the 1st.
  blogs.sort((a, b) => b.likes - a.likes)

  return (

    <table className="table table-hover mt-5">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Url</th>
          <th scope="col">Likes</th>
          <th scope="col">View details</th>
          <th scope="col">Delete blog</th>
        </tr>
      </thead>
  
      <tbody>
        {blogs.map(blog => 
          <tr key={blog.id}>
            <td>{blog.title}</td>
            <td>{blog.author}</td>
            <td>{blog.url}</td>
            <td>{blog.likes}</td>

            {/* Display blog details if "view" button is pressed. */}
            {blog.id === props.viewBlogDetails ?
              <td> 
                <div className="ml-1">Added by : {blog.user.username}</div> 
                <button onClick={ () => handleLikeButton(blog)} type="submit" className="btn btn-outline-info btn-sm">Like</button>
                <button onClick={ () => props.handleCloseBlogDetails()} type="submit" className="btn btn-outline-info btn-sm ml-1">Close</button></td>
              : <td><button onClick={ () => props.handleViewBlogDetails(blog) } type="submit" className="btn btn-outline-info btn-sm">View</button></td>
              }

            {/* Delete is allowed only to user who created the blog */}
            {blog.user.username === loggedUser.username ? 
              <td><button onClick={ () => handleDeleteButton(blog)}  type="submit" className="btn btn-outline-info btn-sm">Delete</button></td>
              : <td></td>
              }
          </tr>)}
      </tbody>
    </table>
  )
}




export default DisplayBlogs
