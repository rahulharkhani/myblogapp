import React from 'react';
import './bootstrap.min.css';
import  { Redirect } from "react-router-dom";
import { addBlog } from './actions'
import { createStore } from 'redux';
const axios = require('axios');

class Addblog extends React.Component {
    /**
     * define state
     */
    state = {
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
    /*constructor () {
        super()
        this.store = this.state;
        console.log("Hello "+this.state)
    }*/
    /*constructor(props) {
        super(props);
        this.store = this.props.store;
    }*/

    /**
     * store value of blog text change
     */
    blogChange =(e)=> {
        const {name, value} = e.target;
        const {bloginfo} = this.state; 
        this.setState({
            bloginfo : { 
                ...bloginfo,
                [name] : value
            }
        });
    }
    /**
     * store value of File change 
     */
    blogimgChange =(e)=> {
        const {name, value} = e.target;
        const {bloginfo} = this.state; 
        this.setState({
            bloginfo : { 
                ...bloginfo,
                [name] : value
            }
        });
        this.setState({
            blogimgfile : e.target.files[0]
        });
    }
    /**
     * Add Blog on submit button
     */
    blogForm =(e)=> {
        e.preventDefault()
        this.setState({titleerr : ""})
        this.setState({descriptionerr : ""})
        this.setState({imgerr : ""})
        this.setState({blogimgname : ""})
        this.setState({blogmsg : ""})
        const {blogtitle,description,blogimage} = this.state.bloginfo
        
        if(blogtitle.length <= 0){
            this.setState({titleerr : "* Blog Title is required..."})
        }
        if(description.length <= 0){
            this.setState({descriptionerr : "* Blog Description is required..."})
        }
        if(blogimage.length <= 0){
            this.setState({imgerr : "* Blog image is required..."})
        }

        if(blogtitle.length > 0 && description.length > 0 && blogimage.length > 0) {
            let tempDate = new Date();
            let date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
            let filename = this.state.blogimgfile.name.toLowerCase().split(' ').join('-');

            const token = localStorage.getItem("userlogintoken");
            const formData = new FormData();
            formData.append('blogtitle', blogtitle);
            formData.append('description', description);
            formData.append('imagename', filename)
            formData.append('blogimg', this.state.blogimgfile);
            formData.append('createddate', date);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': token
                }
            };
            for(var key of formData) {
                console.log(key[0] + ', ' + key[1])
            }
            /**
             * Node api to save data in mongodb
             */
            axios.post('http://localhost:8181/addblog', 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': token
                    }
                }
            ).then(response => {
                //console.log(response);
                if(response.data.success === 1) {
                    //console.log("blog added succeesfully")
                    this.setState({blogmsg : "Blog added successfully"})
                }else{
                    localStorage.removeItem("userlogintoken");
                    this.setState({blogmsg : response.data.body})
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    /*componentDidMount() {
        console.log("Page loaded...")
        if(localStorage.getItem('userlogintoken') === null)
        {
            console.log("redirect on login page")
            return <Redirect to='/' />
        }
        else
        {
            console.log("redirect on blog page")
            return <Redirect to='/addblog'  />
        }
    }*/

    render() {
        //console.log(this.state)
        
        var token = localStorage.getItem("userlogintoken");
        if(token === null) {
            return (<Redirect to="/" />)
        }else{
            return (
                <div>
                    <br /><br /><br />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                            <h3>Add your blog!</h3><hr />
                                <form action="">
                                    <div className="form-group">
                                        <label for="fullname">Blog Title:</label>
                                        <input type="text" className="form-control" name="blogtitle" id="blogtitle" onChange={this.blogChange} />
                                        <p className="errorblock">{this.state.titleerr}</p>
                                    </div>
                                    <div className="form-group">
                                        <label for="email">Blog Description:</label>
                                        <textarea className="form-control" name="description" id="description" onChange={this.blogChange}></textarea>
                                        <p className="errorblock">{this.state.descriptionerr}</p>
                                    </div>
                                    <div className="form-group">
                                        <label for="pwd">Upload Blog Image:</label> 
                                        <input type="file" className="form-control" name="blogimage" id="blogimage" accept="image/*" onChange={this.blogimgChange} />
                                        <p className="errorblock">{this.state.imgerr}</p>
                                    </div>
                                    <p>{this.state.blogmsg}</p>
                                    <button type="submit" className="btn btn-info" onClick={this.blogForm}>Add Blog</button>
                                </form>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Addblog;