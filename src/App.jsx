import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	currentUser: {name: "Anonymous", color: ('#'+(Math.random()*0xFFFFFF<<0).toString(16))},
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
      //New message gets added to state message array as a message
  		if(newMess[0].type === "incomingMessage"){
  			const messages = this.state.messages.concat(newMess)
  			this.setState({messages: messages})
  		}
      //Change of username gets added to state message array as a notification
  		else if(newMess[0].type === "incomingNotification"){
  			const messages = this.state.messages.concat(newMess)
  			this.setState({messages: messages})
  		}
      //Handles user counter when a new user connects
  		else if(newMess[0].type === "Client connected"){
  			this.setState({clientsConnected: newMess[0].count})
  		}
      //Handles user counter when a new user disconnects
  		else if(newMess[0].type === "Client disconnected"){
  			this.setState({clientsConnected: newMess[0].count})
  		}

	}.bind(this)
  }

  //handles when user changes username and presses enter
  userhandle = event => {
    if(event.key == 'Enter' && event.target.value) { 
    	const newNotification = {username: this.state.currentUser.name, content: event.target.value, type: "postNotification"};
    	this.socket.send(JSON.stringify(newNotification));
    	this.setState({currentUser:{name: (event.target.value) ? (event.target.value) : "Anonymous", color: this.state.currentUser.color}})
    } 
  }

  //handles when user writes new message and presses enter
  handler = event => {
    if(event.key == 'Enter' && event.target.value) { 
    	const newMessage = {username: this.state.currentUser.name, color: this.state.currentUser.color, content: event.target.value, type: "postMessage"};
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
  		<MessageList messages={this.state.messages} color={this.state.currentUser.color}/>
    	<ChatBar currentUser={this.state.currentUser.name} userhandle={this.userhandle} handler={this.handler}/>
      </div>
    );
  }

}

export default App;
