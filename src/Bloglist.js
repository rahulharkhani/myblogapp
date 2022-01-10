import React from 'react';
import './bootstrap.min.css';
import {connect} from 'react-redux';
const axios = require('axios');

class Bloglist extends React.Component {
    
    state = {
        blogdata : [],
        itemperPage : 2,
        currentpage : 1,
        totalrecords : 0,
        lastpage : 0,
        moreresult : 1
    }
    
    /**
     * List of all blog which is inserted in mongodb
     */
    BlogListItems=() => {
        /*const reptiles = ['alligator', 'snake', 'lizard'];
        return reptiles.map(reptile => (
          <li>{reptile}</li>
        ));*/
        var data = this.state.blogdata
        if(data.length > 0) {
            data.map((res,i)=>{
                /*console.log(res.title)
                console.log(res.description)
                console.log(res.image)
                console.log(res.createddate)*/
                return (
                    <div>
                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src="http://localhost:8181/uploads/test.jpg" />
                                <div class="card-body">
                                    <h4>{res.title}</h4>
                                    <p class="card-text">{res.description}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                        </div>
                                        <small class="text-muted">{res.createddate}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
        }
    }
    componentDidMount(){
        const NextPage = parseInt(this.state.currentpage);
        const Limit = parseInt(this.state.itemperPage) * NextPage;
        axios.get('http://localhost:8181/listblog').then(response=> {
            if(response.data.success === 1) {
                let lastpage = Math.ceil(response.data.totalrecords/this.state.itemperPage);
                this.setState({
                    blogdata : response && response.data.body,
                    totalrecords : response.data.totalrecords,
                    lastpage : lastpage
                })
                //this.setState({ currentpage : response.data.currentpage })
            }
        })
        .catch( error=> {
            console.log(error);
        })
        console.log(this.props)
    }

    /**
     * Pagination with load more button click
     */
    pageClickbutton =(e)=> {
        const NextPage = parseInt(this.state.currentpage) + 1;
        const Limit = parseInt(this.state.itemperPage) * NextPage;
        const Lastpage = this.state.lastpage;
        axios.post('http://localhost:8181/listblog', {
            NextPage : NextPage,
            Limit : Limit,
            Lastpage : Lastpage
        })
        .then(response=> {
            //console.log(response.data.body)
            if(response.data.success === 1) {
                this.setState({
                    blogdata : response && response.data.body,
                    currentpage : response.data.currentpage,
                    moreresult : response.data.moreresult
                })
            }
        })
        .catch( error=> {
            console.log(error);
        })
        //let NextItem = this.state.currentpage + this.state.itemperPage;
        //this.setState({ currentPage : e.target.id, totalperPage : NextItem });
    }
    

    /**
     * blog list will be display here
     */
    render() {
        if(this.state.blogdata.length > 0) {
            //console.log("Getting data");
            console.log(this.state)
            const blogData = this.state.blogdata;
            var viewstyle = {};
            if(this.state.moreresult === 0) {
                viewstyle.display = 'none';
            }else{
                viewstyle.display = 'block';
            }
            return (
                <div>
                    <br /><br /><br />
                    <div class="container">
                        <div class="row">
                            {blogData.map((res, i) => {
                                /*console.log(res.title)
                                console.log(res.description)
                                console.log(res.image)
                                console.log(res.createddate)*/
                                let blogdetails = res
                                this.props.dispatch({type:'LIST_BLOG',blogdetails});
                                let image = "http://localhost:8181/uploads/"+res.image;
                                let blogurl = "http://localhost:3000/blog/"+res._id;
                                //let blogurl = "http://localhost:3000/blog?id="+res._id;
                                return (
                                    <div class="col-md-4">
                                        <div class="card mb-4 box-shadow">
                                            <img class="card-img-top" src={image} />
                                            <div class="card-body">
                                                <h4 class="card-text">{res.title}</h4>
                                                <p class="card-text">{res.description.substring(0, 70)+"..."}</p>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="btn-group">
                                                        <a href={blogurl} class="btn btn-sm btn-outline-secondary">View</a>
                                                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                                    </div>
                                                    <small class="text-muted">{res.createddate}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="row">
                            <div class="col-md-5"></div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn-info" style={viewstyle} id={this.state.currentpage} onClick={this.pageClickbutton}>Load More</button>
                            </div>
                            <div class="col-md-5"></div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            //console.log("not getting data")
            return (
                <div>
                    <br /><br /><br />
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4"></div>
                            <div class="card mb-4 box-shadow">
                                <div class="card-body">
                                    <p class="card-text">No data available to display on page</p>
                                </div>
                            </div>
                            <div class="col-md-4"></div>
                        </div>
                    </div>
                    {/*console.log(this.state.blogdata)}
                    {this.BlogListItems()*/}
                </div>
            );
        }
        //console.log(this.state)
        
    }
}

export default connect()(Bloglist);