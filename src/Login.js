import React from 'react';
import './bootstrap.min.css';
import  { Route, Redirect } from "react-router-dom";
const axios = require('axios');

class Login extends React.Component {
    /**
     * define state
     */
    state = {
        userinfo : {
            email : "",
            password : ""
        },
        userregisterinfo : {
            fullname : "",
            email : "",
            password : "",
            phone : "",
        },
        emerr : "",
        pserr : "",
        fullnameerr : "",
        emailerr : "",
        passworderr : "",
        phoneerr : "",
        loginmsg : "",
        registermsg : ""
    }
    
    /**
     * Login form set state value on fill up the textbox
     */
    handleChange =(event)=> {
        const {name, value} = event.target;
        const {userinfo} = this.state; 
        this.setState({
            userinfo : { 
                ...userinfo,
                [name] : value
            },
            userregisterinfo : {
                fullname : "",
                email : "",
                password : "",
                phone : "",
            }
        });
    }
    /**
     * Login form on submit button
     */
    submitForm =(e)=> {
        e.preventDefault()
        this.setState({emerr : ""})
        this.setState({pserr : ""})
        this.setState({fullnameerr : ""})
        this.setState({emailerr : ""})
        this.setState({passworderr : ""})
        this.setState({phoneerr : ""})
        this.setState({loginmsg : ""})
        this.setState({registermsg : ""})
        const {email,password} = this.state.userinfo
        
        if(email.length <= 0){
            this.setState({emerr : "* Email is required..."})
        }
        if(password.length <= 0){
            this.setState({pserr : "* Password is required..."})
        }

        if(email.length > 0 && password.length > 0) {
            /**
             * Node api to save data in mongodb
             */
            //console.log("data is valid you can login with credentials");
            axios.post('http://localhost:8181/login', {
                email: email,
                password: password
            }).then(response => {
                //console.log(response);
                if(response.data.success === 1) {
                    console.log(response.data.token)
                    localStorage.setItem("userlogintoken", response.data.token);
                    console.log("It works!");
                }
                this.setState({loginmsg : response.data.body})
                //this.state.value = "";
            }).catch(error => {
                console.log(error);
            });
            /*axios.get('http://localhost:8181/login').then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });*/
        }else{
            console.log("error with cerdentials")
        }
    }

    /**
     * Registeration form set state value on fill up the textbox
     */
    registerChange =(e)=> {
        const {name, value} = e.target;
        const {userregisterinfo} = this.state;
        this.setState({
            userinfo : {
                email : "",
                password : ""
            },
            userregisterinfo : {
                ...userregisterinfo,
                [name] : value
            }
        })
    }
    /**
     * Registration form on submit button
     */
    registerForm =(e)=> {
        e.preventDefault();
        const {fullname, email, password, phone} = this.state.userregisterinfo;
        this.setState({
            emerr : "",
            pserr : "",
            fullnameerr : "",
            emailerr : "",
            passworderr : "",
            phoneerr : "",
            loginmsg : "",
            registermsg : ""
        })

        if(fullname.length <= 0) { this.setState({fullnameerr : "* Fullname is required..."})}
        if(email.length <= 0) { this.setState({emailerr : "* Email is required..."})}
        if(password.length <= 0) { this.setState({passworderr : "* Password is required..."})}
        if(phone.length <= 0) { this.setState({phoneerr : "* Phone is required..."})}
        let tempDate = new Date();
        let date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        if(fullname.length > 0 && email.length > 0 && password.length > 0 && phone.length > 0) {

            /**
             * Node api to save data in mongodb
             */
            axios.post('http://localhost:8181/register', {
                fullname: fullname,
                email: email,
                password: password,
                phone: phone,
                registereddate : date
            })
            .then(response => {
                console.log(response);
                this.setState({registermsg : response.data.body})
                //this.state.value = "";
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
            return <Redirect to="/" />;
        }
        else
        {
            console.log("redirect on blog page")
            return <Redirect to="/addblog" />;
        }
    }*/

    /**
     * Render class function is bydefault
     */
    render() {
        //console.log(this.state.emerr);
        //localStorage.setItem(this.state.userinfo.email,{emil:this.state.userinfo.email})
        //localStorage.setItem("key", "value");
        //console.log(this.state);
        var token = localStorage.getItem("userlogintoken");
        if(token != null) {
            return (<Redirect to="/addblog" />)
        }else{
            return (
                <div>
                    <br /><br /><br />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <h3>Member Login!</h3><hr />
                                <form action="">
                                    <div class="form-group">
                                        <label for="email">Email address:</label>
                                        <input type="email" class="form-control" name="email" id="email" onChange={this.handleChange} />
                                        <p className="errorblock">{this.state.emerr}</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="pwd">Password:</label> 
                                        <input type="password" class="form-control" name="password" id="pwd" onChange={this.handleChange} />
                                        <p className="errorblock">{this.state.pserr}</p>
                                    </div>
                                    <p>{this.state.loginmsg}</p>
                                    <button type="submit" class="btn btn-primary" onClick={this.submitForm}>Login</button>
                                </form>
                            </div>
                            <div className="col-md-2"></div>
                            <div className="col-md-5">
                                <h3>Member Registration!</h3><hr />
                                <form action="">
                                    <div class="form-group">
                                        <label for="fullname">Fullname:</label>
                                        <input type="text" class="form-control" name="fullname" id="fullname" onChange={this.registerChange} />
                                        <p className="errorblock">{this.state.fullnameerr}</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email address:</label>
                                        <input type="email" class="form-control" name="email" id="email" onChange={this.registerChange} />
                                        <p className="errorblock">{this.state.emailerr}</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="pwd">Password:</label> 
                                        <input type="password" class="form-control" name="password" id="pwd" onChange={this.registerChange} />
                                        <p className="errorblock">{this.state.passworderr}</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="pwd">Phone:</label> 
                                        <input type="text" class="form-control" name="phone" id="phone" onChange={this.registerChange} />
                                        <p className="errorblock">{this.state.phoneerr}</p>
                                    </div>
                                    <p>{this.state.registermsg}</p>
                                    <button type="submit" class="btn btn-info" onClick={this.registerForm}>Register</button>
                                </form>
                            </div>
                        </div>
                    </div>    
                </div>
            );
        }
    }
}

export default Login;