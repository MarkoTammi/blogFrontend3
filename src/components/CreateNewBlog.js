

// Component to create new blog

import React, {} from 'react'


const CreateNewBlog = (props) => {

    // to show createNewBlog form or not
    // CSS property 'display' is none or ''
    const hideWhenVisible = { display : props.createNewBlogVisible ? 'none': '' }
    const showWhenVisible = { display : props.createNewBlogVisible ? '' : 'none' }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button className="btn btn-outline-secondary btn-sm mt-4" onClick={ () => props.setCreateNewBlogVisible(true)}>Create new blog</button>
            </div>
            <div style={showWhenVisible}>
                <h6 className="mt-4">Create new blog</h6>
                <form className="form-group" onSubmit={props.handleCreateNew}>
                    <input className="form-control" placeholder="Title" value={props.newTitle} onChange={props.handleNewTitleInput}/>
                    <input className="form-control" placeholder="Author" value={props.newAuthor} onChange={props.handleNewAuthorInput}/>
                    <input className="form-control" placeholder="Url" value={props.newUrl} onChange={props.handleNewUrlInput}/>
                    <div className="mt-2"> 
                        <button className="btn btn-primary btn-sm" type="submit">Create</button>
                        <button className="btn btn-outline-secondary btn-sm ml-2" onClick={props.handleCancelNewBlog}>Cancel and close form</button> 
                    </div>
                </form>
            </div>
        </div>
    )
}


export default CreateNewBlog