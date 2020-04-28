
// Services for blogs

import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

// To get blogs from backend
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// To create new blog to backend
const createNew = async (newBlog) => {
  const config = {
      headers: { Authorization: token }
  }
  //console.log('createNew blog - config: ', config)
  //console.log('createNew blog - newBlog', newBlog)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}


export default { 
  getAll,
  setToken,
  createNew 
  }