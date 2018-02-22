import React, {Component} from 'react';

class Message extends Component {

  	render() {
  		//If it's a url that links to an image we want to render the image
  		if(this.props.type === "incomingMessage"){
  			if(this.props.content.endsWith(".jpg") || this.props.content.endsWith(".png") || this.props.content.endsWith(".gif")){
		    	return (
		    		<div className="message">
		    	  		<span className="message-username" style={{color : this.props.color}}>{this.props.user}</span>
		    			<img src={this.props.content}/>
		  	 		</div>	
		    	);
	    	} else {
	    		//If it's a standard text message
	    		return (
		    		<div className="message">
		    	  		<span className="message-username" style={{color : this.props.color}}>{this.props.user}</span>
		    			<span className="message-content">{this.props.content}</span>
		  	 		</div>	
		    	);
	    	}
    	} else {
    		//Update for new usernames
    		return (
 	  	 	<div className="message system">
  	 			<span>{this.props.content}</span>
  	 		</div>
	    );
    	}
  	}
}

export default Message;