import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	currentUser: {name: "Bob"},
  		messages: []
  	};

  	this.handler = this.handler.bind(this)
  }

  componentDidMount(){
 	this.socket = new WebSocket('ws:\//localhost:3001');

 	this.socket.onopen = function (event) {
  		console.log("Connected to Server!"); 
	};
  }

  userhandle = event => {
    if(event.key == 'Enter') { 
    	console.log(this.state.currentUser)
    	this.setState({currentUser:{name: event.target.value}})
    } 
  }

  handler = event => {
  	function generateRandomString() {
	    let chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	    let result = '';
	    for (let i = 0; i < 5; i++) {
	        result += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return (result);
  	}
    if(event.key == 'Enter') { 
    	const newMessage = {username: this.state.currentUser.name, content: event.target.value};
    	const messages = this.state.messages.concat(newMessage)
    	this.socket.send(`user ${newMessage.username} said ${newMessage.content}`);
    	this.setState({messages: messages})
    	event.target.value = "";
    } 
  }


 


  render() {
    return (
   	  <div>
   	    <nav className="navbar">
		  <a href="/" className="navbar-brand">Chatty</a>
  		</nav>
  		<MessageList messages={this.state.messages}/>
    	<ChatBar currentUser={this.state.currentUser.name} userhandle={this.userhandle} handler={this.handler}/>
      </div>
    );
  }

}

export default App;
