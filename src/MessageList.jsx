import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
	render() {
		const allMessages = this.props.messages.map((number) =>
  			<Message user={number.username} content={number.content} type={number.type} color={number.color} key={number.id}/>
		);
	    return (
	    	<div id="message-list">
	    		{allMessages}
	  		</div>
	    );
  	}
}
export default MessageList;