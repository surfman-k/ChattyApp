import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  render() {
    return (
   	  <div>
    	<h1>Hello React :)</h1>
    	<ChatBar/>
      </div>
    );
  }
}
export default App;
