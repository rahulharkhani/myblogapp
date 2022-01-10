const initialState = {
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
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_BLOG':
        console.log("You have added blog")
        return Object.assign({}, state, {
            bloginfo: state.bloginfo
        })
        case 'LIST_BLOG':
        console.log("You have listed blog")
        return Object.assign({}, state, {
            bloginfo: state.bloginfo
        })
        case 'VIEW_BLOG':
        console.log("You have view blog")
        return Object.assign({}, state, {
            bloginfo: state.bloginfo
        })
        default:
        return state
    }
}


/*function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_BLOG':
        console.log("You have added blog")
        return Object.assign({}, state, {
            bloginfo: state.bloginfo
        })
        case 'LIST_BLOG':
        console.log("You have listed blog")
        return Object.assign({}, state, {
            bloginfo: state.bloginfo
        })
        case 'VIEW_BLOG':
        console.log("You have view blog")
        return Object.assign({}, state, {
            bloginfo: state.bloginfo
        })
        default:
        return state
    }
};
export default rootReducer;*/