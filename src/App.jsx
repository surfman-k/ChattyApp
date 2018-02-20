import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	currentUser: {name: "Bob"},
  		messages: [
		    {
		      username: "Bob",
		      content: "Has anyone seen my marbles?",
		      id: "45ret"
		    },
		    {
		      username: "Anonymous",
		      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
		      id: "qucos"
		    }
  		]
  	};

  	this.handler = this.handler.bind(this)
  }

  handler = event => {
                if(event.key == 'Enter') { 
                	console.log(event.target.value);
                   // this.setState({ value: event.target.value })
                } 
            }


  render() {
    return (
   	  <div>
   	    <nav className="navbar">
		  <a href="/" className="navbar-brand">Chatty</a>
  		</nav>
  		<MessageList messages={this.state.messages}/>
    	<ChatBar currentUser={this.state.currentUser.name} handler = {this.handler}/>
      </div>
    );
  }

}

export default App;
