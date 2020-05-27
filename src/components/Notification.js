
// Component to display notification.

import React from 'react'

import { useSelector } from 'react-redux'

const Notification = () => {

    const notification = useSelector(state => state.notification)
    //console.log('notication', notification)
  
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    
    return (
      <div>
          { notification !== '' && <div style={style}>{notification}</div> }
      </div>
    )
}


/* const Notification = (props) => {
    if (props.message === '') {
        return null
    }

    return (
        <div className="border border-warning">
        <h5 style= { { color:'black' } } className='error text-center p-2'>{ props.message }</h5>
        </div>
    )
}
 */

export default Notification