


// blogsReducer

import blogsService from '../services/blogs'


const blogsReducer = (state = [], action) => {
    //console.log('blogsReducer state : ', state)
    //console.log('blogsReducer action : ', action)

    switch(action.type) {
        // Initialize blogs store
        case 'INIT_BLOGS' :
            return state = action.data
        // Create new blog
        case 'CREATE_NEW':
            return [...state, action.data]
        // Blog voted - add one vote
        case 'BLOG_VOTED':
            const id1 = action.data.id
            const blogToChange = state.find(n => n.id === id1)
            const votedBlog = { ...blogToChange, likes: blogToChange.likes }
            return state.map ( blog => blog.id !== id1 ? blog : votedBlog)
        // Delete blog
        case 'DELETE_BLOG':
            const id2 = action.data
            const blogsRemain = state.filter(n => n.id !== id2)
            return state = blogsRemain
        // Clear blogs store
        case 'CLEAR_BLOGS_STORE':
            return state = []
        default:
            return state
    }
}
export default blogsReducer

// ACTIONS for blogs

// Action - Initialize all blogs
export const actionInitializeBlogs = () => {
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


// Action - Create new blog
export const actionCreateNewBlog = (data, user) => {
    return async dispatch => {
        const newBlog = await blogsService.createNew(data)
        //console.log('newBlog', newBlog)
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

// Action - Blog is voted +1
export const actionBlogVoted = (data, user) => {
    // Add one vote
    data.likes = data.likes + 1
    return async dispatch => {
        const updatedBlog = await blogsService.updateBlog(data)
        dispatch(
            {
                type: 'BLOG_VOTED',
                data:
                {
                    title: updatedBlog.title,
                    author: updatedBlog.author,
                    url: updatedBlog.url,
                    id: updatedBlog.id,
                    likes: updatedBlog.likes,
                    user: {
                        id: updatedBlog.user,
                        name: user.name,
                        username: user.username
                    }
                }
            }
        )
    }
}

// Action - Delete blog
export const actionDeleteBlog = (data) => {
    //console.log('actionDeleteBlog',data.id)
    return async dispatch => {
        await blogsService.deleteBlog(data.id)
        dispatch(
            {
                type: 'DELETE_BLOG',
                data: data.id
            }
        )
    }
}


// Action - Clear blogs store
export const actionClearBlogsStore = () => {
    console.log('actionClearBlogsStore')
    return async dispatch => {
        dispatch(
            {
                type: 'CLEAR_BLOGS_STORE'
            }
        )
    }
}

