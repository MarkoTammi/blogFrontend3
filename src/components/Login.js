// Login component

import React from 'react'

const Login = (props) => (
    <div className="text-center mt-5">
        <form className="form-group" onSubmit={props.handleLogin}>
            <h5 className="font-weight-normal" >Please log in</h5>
            <div>
                <input
                    className="form-control"
                    placeholder="Username"
                    type = "text"
                    value={props.username}
                    name="Username"
                    onChange={ ( { target } ) => props.setUsername(target.value) }
                />
            </div>
            <div>
                <input
                    className="form-control"
                    placeholder="Password"
                    type = "password"
                    value={props.password}
                    name="Password"
                    onChange={ ( { target } ) => props.setPassword(target.value) }
                />
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
        </form>
    </div>
)
export default Login