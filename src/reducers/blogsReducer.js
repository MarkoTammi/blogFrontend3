


// blogsReducer

import blogsService from '../services/blogs'


const blogsReducer = (state = [], action) => {
    console.log('blogsReducer state : ', state)
    console.log('blogsReducer action : ', action)
    switch(action.type) {
        // Initialize blogs store
        case 'INIT_BLOGS' :
            return state = action.data
        // Create new blog
        case 'CREATE_NEW':
            return [...state, action.data]
        default:
            return state
    }
}
export default blogsReducer

// ACTIONS for blogs

// Initialize all blogs at setup
export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        dispatch(
            {
                type: 'INIT_BLOGS',
                data: blogs
            }
        )
    }
}


// Create new blog
export const createNewBlog = (data, user) => {
    return async dispatch => {
        const newBlog = await blogsService.createNew(data)
        console.log('newBlog', newBlog)
        console.log('DATA ODOTTAA name JA USERNAME - kun login on valmis')
        dispatch(
            {
                type: 'CREATE_NEW',
                data: 
                    {
                        title: newBlog.title,
                        author: newBlog.author,
                        url: newBlog.url,
                        id: newBlog.id,
                        likes: 0,
                        user: {
                            id: newBlog.user,
                            name: user.name,
                            username: user.username
                        }
                    }
            }
        )
    }
}


