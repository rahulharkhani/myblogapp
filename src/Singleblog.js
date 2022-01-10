import React from 'react';
import './bootstrap.min.css';
import {connect} from 'react-redux';
import { match } from 'react-router'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'
const axios = require('axios');

/*const Child = ({ match }) => (
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
)*/

class Singleblog extends React.Component {
    
    state = {
        blogdata : []
    }
    /*constructor (props){
        super (props);
        this.state = {
            blogdata : []
        };
    }*/
    componentDidMount(){
        
        //let id = window.location.search.substring(4);
        //console.log(this.props.match.params.id)
        let id = this.props.match.params.id;
        axios.post('http://localhost:8181/view/', {
            id: id
        })
        .then(response => {
            //console.log(response.data.body);
            if(response.data.success === 1) {
                this.setState({
                    blogdata : response && response.data.body
                });
                let data = response.data.body[0];
                //this.props.dispatch({type:'VIEW_BLOG', data});
                //console.log(this.props.dispatch({type:'VIEW_BLOG', data}))
            }            
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    /**
     * blog list will be display here
     */
    render() {
        //console.log(this.props)
        //console.log(this.state.blogdata);
        const blogData = this.state.blogdata;
        return (
            <div>
                <br />
                <div class="container">
                    <div class="row">
                        <div class="col-md-2"></div>
                        {blogData.map((res, i) => {
                            let image = "http://localhost:8181/uploads/"+res.image;
                            return (
                                <div class="col-md-8">
                                    <div class="card mb-4 box-shadow">
                                        <img class="card-img-top" src={image} />
                                        <div class="card-body">
                                            <h4 class="card-text">{res.title}</h4>
                                            <p class="card-text">{res.description}</p>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <small class="text-muted">{res.createddate}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div class="col-md-2"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Singleblog);