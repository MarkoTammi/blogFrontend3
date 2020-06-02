


// notificationReducer


const notificationReducer = (state = '', action) => {
    //console.log('notificationReducer state : ', state)
    //console.log('notificationReducer action : ', action)
    switch(action.type) {
        case 'SET_MSG' :
          return state = action.notification
        case 'CLEAR_MSG' :
          return state = action.notification
        default:
          return state
    }
}
export default notificationReducer



const setNotification = (notification) => {
  return {
    type: 'SET_MSG',
    notification: notification
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_MSG',
    notification: ''
  }
}


// Function to display notification if new blog is created or existing voted.
// timeoutId is global variable defined at global.js.
export const actionSetClearNotification = (msgToDisplay, timeInSec, timeoutId) => {

  return (dispatch, getState) => {

    // Fetch all content from Store/state
    const state = getState()

    // If any msg is displayed by Notification component it's first cleared
    if (state.notification === '') {
        dispatch(setNotification(msgToDisplay))
    } else {
        clearTimeout(timeoutId[0])
        dispatch(setNotification(msgToDisplay))
    }

    //Global variable possible to update using timeoutId[0]
    timeoutId[0] = setTimeout(() => {
        dispatch(clearNotification('CLEAR_MSG'))
        //console.log('timeoutId CLEARED', timeoutId[0])
        }, timeInSec * 1000)
  }
}