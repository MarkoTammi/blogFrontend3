

// Login.js
// Service for login procedure
// Username and password is sent to backend
// Token or error is received



import axios from 'axios'
const baseUrl = '/api/login'

// credentials = username and password
const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }