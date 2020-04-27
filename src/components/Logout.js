// Logout component

import React from 'react'

const Logout = (props) => (
    <div className="">
        <button onClick={props.handleLogout} type="submit" className="btn btn-info">{props.user.username} - LOGOUT</button>
    </div>
)
export default Logout