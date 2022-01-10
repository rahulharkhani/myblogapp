import React from 'react';
import './bootstrap.min.css';
import Login from './Login';
import Addblog from './Addblog';
import Bloglist from './Bloglist';
import Singleblog from './Singleblog';
import Addblogredux from './Addblogredux';
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Menu extends React.Component {
    render() {
        return (
            <div>
                <br />
                <Router>
                    <div>
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <Link class="nav-link active" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link active" to="/addblog">Add Blog</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link active" to="/listblog">List Blog</Link>
                            </li> 
                            <li class="nav-item">
                                <Link class="nav-link active" to="/blog">Single Blog</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link active" to="/addreduxblog">Redux Blog Add</Link>
                            </li>                            
                        </ul>
                        
                        {/* A <Switch> looks through its children <Route>s and
                            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/addreduxblog">
                                <Addblogredux />
                            </Route>
                            <Route path="/listblog">
                                <Bloglist />
                            </Route>
                            <Route path="/addblog">
                                <Addblog />
                            </Route>
                            <Route path="/blog">
                                <Singleblog />
                            </Route>
                            <Route path="/">
                               <Login />
                            </Route>
                            {/**
                             * we can also write following methods if we define / path of begining
                             * <Route path="/addblog" exact component={Addblog}>{<Addblog />}</Route>
                             * 
                             * Always define / path at the last otherwise we have write above syntax 
                             */}
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default Menu;