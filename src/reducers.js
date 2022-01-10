/*const initialState = {
    bloginfo : {
        blogtitle : "",
        description : "",
        blogimage : ""
    },
    blogimgfile : "",
    blogimgname : "",
    titleerr : "",
    descriptionerr : "",
    imgerr : "",
    blogmsg : ""
}*/

const initialState = {
    blog : []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_BLOG':
            console.log("You have added blog")
            state = { 
                ...state,
                blog: [...state.blog, action.blogdetails]
            }
            console.log(state)
            return state;
            
        case 'LIST_BLOG':
            console.log("You have listed blog")
            state = { 
                ...state,
                blog: [...state.blog, action.blogdetails]
            }
            console.log(state)
            return state;
        case 'VIEW_BLOG':
            console.log("You have view blog")
            return {
                ...state,
                blog: [...state.blog, action.blogdetails]
            }
        default:
            //console.log(state)
            return state
    }
}

/*return { 
    ...state,
    blog: [...state.blog, action.data]
}*/
/*return Object.assign({}, state, {
    bloginfo: state.bloginfo
})*/

export default rootReducer;