import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	currentUser: {name: "Anonymous"},
  		messages: [],
  		clientsConnected: 0
  	};

  	this.handler = this.handler.bind(this)
  }

  componentDidMount(){
 	this.socket = new WebSocket('ws:\//localhost:3001');

 	this.socket.onopen = function (event) {
  		console.log("Connected to Server!"); 
	};

	this.socket.onmessage = function (event) {
		let newMess = [JSON.parse(event.data)];
  		console.log(newMess[0]);
  		if(newMess[0].type === "incomingMessage"){
  			const messages = this.state.messages.concat(newMess)
  			this.setState({messages: messages})
  		}
  		else if(newMess[0].type === "incomingNotification"){
  			console.log(newMess[0])
  			const messages = this.state.messages.concat(newMess)
  			this.setState({messages: messages})
  		}
  		else if(newMess[0].type === "Client connected"){
  			this.setState({clientsConnected: newMess[0].count})
  		}
  		else if(newMess[0].type === "Client disconnected"){
  			this.setState({clientsConnected: newMess[0].count})
  		}

	}.bind(this)
  }

  userhandle = event => {
    if(event.key == 'Enter') { 
    	const newNotification = {username: this.state.currentUser.name, content: event.target.value, type: "postNotification"};
    	this.socket.send(JSON.stringify(newNotification));
    	this.setState({currentUser:{name: (event.target.value) ? (event.target.value) : "Anonymous"}})
    } 
  }

  handler = event => {
    if(event.key == 'Enter') { 
    	const newMessage = {username: this.state.currentUser.name, content: event.target.value, type: "postMessage"};
    	this.socket.send(JSON.stringify(newMessage));
    	event.target.value = "";
    } 
  }

  render() {
    return (
   	  <div>
   	    <nav className="navbar">
		  <a href="/" className="navbar-brand">Chatty</a>
		  <span className="usercount">{this.state.clientsConnected} users online</span>
  		</nav>
  		<MessageList messages={this.state.messages}/>
    	<ChatBar currentUser={this.state.currentUser.name} userhandle={this.userhandle} handler={this.handler}/>
      </div>
    );
  }

}

export default App;
