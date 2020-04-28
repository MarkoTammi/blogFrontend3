
// Component to display notification.

import React from 'react'

const Notification = (props) => {
    if (props.message === '') {
        return null
    }

    return (
        <div className="border border-warning">
        <h5 style= { { color:'black' } } className='error text-center p-2'>{ props.message }</h5>
        </div>
    )
}

export default Notification