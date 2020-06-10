


// userReducer

import userService from '../services/login'

const userReducer = (state = '', action) => {
    console.log('userReducer state : ', state)
    console.log('userReducer action : ', action)

    switch(action.type) {
        // Login
        case 'SET_USER' :
            return state = action.data
        // Logout
        case 'CLEAR_USER':
            return state = ''
        default:
            return state
    }
}
export default userReducer

// ACTIONS for blogs

export const actionSetUser = user => {
    //console.log('actionSetUser', user)
    return dispatch => {
        dispatch(
            {
                type: 'SET_USER',
                data: user
            }
        )
    } 
}

export const actionClearUser = () => {
    //console.log('actionClearUser')
    return dispatch => {
        dispatch(
            {
                type: 'CLEAR_USER'
            }
        )
    } 
}

export const actionLogin = (user) => {
    //console.log('actionLogin', user)
    return async dispatch => {
        const loggedUser = await userService.login(user)
        dispatch(actionSetUser(loggedUser))
        // Save user to local storage
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
    }
}

export const actionLogout = () => {
    //console.log('actionLogout')
    return async dispatch => {
        dispatch(actionClearUser())
    }
}


