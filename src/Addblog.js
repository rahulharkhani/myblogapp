import React from 'react';
import './bootstrap.min.css';
import  { Redirect } from "react-router-dom";
import { addBlog } from './actions'
import {connect} from 'react-redux';
const axios = require('axios');

class Addblog extends React.Component {
    /**
     * define state
     */
    state = {
        blogimage : "",
        titleerr : "",
        descriptionerr : "",
        imgerr : ""
    }
    blogimgChange =(e)=> {
        const {name, value} = e.target;
        const blogimgfile = e.target.files[0];
        this.setState({blogimage : blogimgfile});
        //console.log(blogimgfile)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const blogtitle = this.blogtitle.value;
        const description =  this.description.value;
        const blogimage =  this.state.blogimage.name;

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
            let filename = this.state.blogimage.name.toLowerCase().split(' ').join('-');

            const token = localStorage.getItem("userlogintoken");
            const formData = new FormData();
            formData.append('blogtitle', blogtitle);
            formData.append('description', description);
            formData.append('imagename', filename)
            formData.append('blogimg', this.state.blogimage);
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
                console.log(response);
                if(response.data.success === 1) {
                    console.log("blog added succeesfully")
                    let blogdetails = response.data.blogdetails;
                    console.log(blogdetails)
                    this.props.dispatch({type:'ADD_BLOG',blogdetails});
                    //this.setState({blogmsg : "Blog added successfully"})
                }else{
                    localStorage.removeItem("userlogintoken");
                    //this.setState({blogmsg : response.data.body})
                }
            })
            .catch(error => {
                console.log(error);
            });
            const data = {
                blogtitle,
                description,
                filename
            }
            //console.log(data)
            //this.props.dispatch({type:'ADD_BLOG',data});
            this.blogtitle.value = '';
            this.description.value = '';
        }
    }

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
                                <form action="" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label for="fullname">Blog Title:</label>
                                        <input type="text" required className="form-control" name="blogtitle" id="blogtitle" ref={(input)=>this.blogtitle = input} />
                                        <p className="errorblock">{this.state.blogtitle}</p>
                                    </div>
                                    <div className="form-group">
                                        <label for="email">Blog Description:</label>
                                        <textarea className="form-control" required name="description" id="description" ref={(input)=>this.description = input}></textarea>
                                        <p className="errorblock">{this.state.descriptionerr}</p>
                                    </div>
                                    <div className="form-group">
                                        <label for="pwd">Upload Blog Image:</label> 
                                        <input type="file" required className="form-control" name="blogimage" id="blogimage" accept="image/*" onChange={this.blogimgChange}  />
                                        <p className="errorblock">{this.state.imgerr}</p>
                                    </div>
                                    <p>{this.blogmsg}</p>
                                    <button type="submit" className="btn btn-info">Add Blog</button>
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

export default connect()(Addblog);