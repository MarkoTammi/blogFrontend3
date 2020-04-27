
import React from 'react'



const DisplayBlogs = (props) => (

  <table className="mt-5">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Author</th>
        <th scope="col">Url</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      {props.blogs.map(blog => 
        <tr key={blog.title}>
          <td>{blog.title}</td>
          <td>{blog.author}</td>
          <td>{blog.url}</td>
        </tr>)}
    </tbody>
  </table>

)

export default DisplayBlogs
