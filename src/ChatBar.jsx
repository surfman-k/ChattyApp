import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    return (
      <footer className="chatbar">
  		<input className="chatbar-username" placeholder="Enter Name (Optional)" onKeyPress={this.props.userhandle} />
  		<input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.handler} />
	  </footer>
    );
  }
}
export default ChatBar;