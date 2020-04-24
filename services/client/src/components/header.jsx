import React, {Component} from 'react'
import axios from 'axios'

class Header extends Component {
    
    constructor(){
        super()
        this.state = {}
    }

    componentDidMount = () => {

    }

    onTextChangeCA = e => {
        e.preventDefault()
        console.log("Event: " + e.target.id)
        this.setState({
          [e.target.id]: e.target.value
        })
    }

    login = e => {
        const { email, password } = this.state
        e.preventDefault()
        // Do the API login call
        axios.post('/api/login', {
            email: email,
            password: password
        })
        .then((res) => {
            console.log(res)
            this.setState({
                sessionToken: res.sessionToken
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    register = e => {
        const { email, password, con_pass, type } = this.state
        e.preventDefault()
        // Do the API call
        axios.post('/api/registration', {
            email: email,
            password: password,
            con_pass: con_pass,
            type: type
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // var options = {
    //     method: 'GET',
    //     url: 'https://myapi.com/api',
    //     headers: {'content-type': 'application/json', authorization: 'Bearer ACCESS_TOKEN'}
    // }

    render(){
        return(
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Innovative Sickers</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Features</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/">Action</a>
                        <a className="dropdown-item" href="/">Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/">Something else here</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="/" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                    </ul>
                    <button class="btn btn-primary" id="loginPop" data-toggle="modal" data-target="#loginModal" type="submit">Login</button>
                    <button class="btn btn-primary ml-1" id="signupPop" data-toggle="modal" data-target="#signupModal" type="submit">Signup</button>
                </div>
            </nav>

            {/* <!--Login Modal--> */}
            
            <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        
                        <form>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name="email" 
                                    id="email"
                                    placeholder="Email" 
                                    onChange={(e) => this.onTextChangeCA(e)}
                                    required />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name="password" 
                                    id="password"
                                    placeholder="Password" 
                                    onChange={(e) => this.onTextChangeCA(e)}
                                    required />
                            </div>

                            <div class="modal-footer">
                                <small>Not Yet a Member? </small>
                                <a class="btn btn-secondary" href="/signup" role="button">Register</a>
                                <button 
                                    type="submit" 
                                    class="btn btn-primary" 
                                    onClick={(e) => this.login(e)}>Submit</button>
                            </div>
                        </form>

                    </div>
                    
                </div>
            </div>
        </div>

        {/* Modal Register */}
        <div className="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Sign Up</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                <div className="modal-body">
       
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                placeholder="Your Name" 
                                id="email" 
                                aria-describedby="emailHelp" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                required />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        <div className="form-group">
                            <label for="exampleInputEmail1">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password" 
                                id="password" 
                                aria-describedby="emailHelp" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                required />
                        </div>

                        <div className="form-group">
                            <label for="exampleInputPassword1">Confirm Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="con_pass" 
                                id="con_pass" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                required />
                        </div>

                        <div className="form-group">
                            <label for="exampleInputPassword1">Type</label>
                            <input 
                                type="text"
                                className="form-control" 
                                name="type" 
                                id="type" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                required />
                        </div>
                        
                        <div className="modal-footer">
                            <small>Already a Member? </small>
                            <a className="btn btn-secondary" href="/login" role="button">Login</a>
                            <button 
                                type="submit" 
                                class="btn btn-primary"
                                onClick={(e) => this.register(e)}
                                >Submit</button>
                        </div>
                    </form>

                </div>
                
                </div>
            </div>
            </div>
            
        </React.Fragment>
        )
    }
}

export default Header