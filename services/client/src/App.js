import React, { Component } from 'react'
import axios from 'axios'
import Header from './components/header'
import './App.css'
import Jumbotron from './components/jumbotron'
import Footer from './components/footer'

class App extends Component {
  // constructor(props) {
  //   super(props)
  //   // this.onTextChangeCA = this.onTextChangeCA.bind(this)
  // }

  // onTextChangeCA = e => {
  //   e.preventDefault()
  //   console.log("Event: " + e.target.id)
  //   this.setState({
  //     [e.target.id]: e.target.value
  //   })
  // }

  componentDidMount () {
    axios.get('/api/users')
    .then((response) => {
      console.log(response.data);
      this.setState({ users: response.data })
    })
    .catch(err => console.log(err))
  }

  render() {
    return (

      <div className='page-container'>
        <Header 
          onTextChangeCA={this.onTextChangeCA}
        />

        <Jumbotron/>
        <Footer/>
      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Holy smokes React plus Docker!
      //     </p>
      //     {
      //       this.state.users.map((user,index) => (
      //         <p key={index}>{index + 1}. {user}</p>
      //       ))
      //     }
      //   </header>
      // </div>
    )
  }
}

export default App;
