
// Component to display all blogs

import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'


const DisplayBlogs = (props) => {
  
  const dispatch = useDispatch()

/*   useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch]) */

  const blogs = useSelector(state => state.blogs)
  // Sort blogs by "likes". Most likes is the 1st.
  blogs.sort((a, b) => b.likes - a.likes)

  console.log('DisplayBlogs', blogs)
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
                <button onClick={ () => props.handleLikeBlog(blog)} type="submit" className="btn btn-outline-info btn-sm">Like</button> 
                <button onClick={ () => props.handleCloseBlogDetails()} type="submit" className="btn btn-outline-info btn-sm ml-1">Close</button></td>
              : <td><button onClick={ () => props.handleViewBlogDetails(blog) } type="submit" className="btn btn-outline-info btn-sm">View</button></td>
              }

            {/* Delete is allowed only to user who created the blog */}
            {blog.user.username === props.user.username ? 
              <td><button onClick={ () => props.handleDelete(blog) } type="submit" className="btn btn-outline-info btn-sm">Delete</button></td>
              : <td></td>
              }

          </tr>)}
      </tbody>
    </table>
  )
}




export default DisplayBlogs
