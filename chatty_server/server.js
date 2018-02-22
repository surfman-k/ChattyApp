const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;


let counter = 0;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

//Function that will send data to all clients connected to server
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  counter += 1;
  console.log(counter);
  	wss.broadcast(JSON.stringify({type: "Client connected", count: counter}));

  //Server side handling of incoming messages and user-change notifications
  //server also creates unique keys using UUID
  ws.on('message', function incoming(message) {
  	let mess = JSON.parse(message);
  	console.log(mess);
  	if(mess.type === "postMessage"){
  		const answer = {id: uuidv4(), username: mess.username, color: mess.color, content: mess.content, type: "incomingMessage"};
  		wss.broadcast(JSON.stringify(answer));
  	}
  	else if(mess.type === "postNotification"){
  		const answer = {id: uuidv4(), content: `${mess.username} changed their name to ${mess.content}`, type: "incomingNotification"};
  		wss.broadcast(JSON.stringify(answer));
  	}
});

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
  	console.log('Client disconnected');
  	counter -= 1;
  	console.log(counter);
  	wss.broadcast(JSON.stringify({type: "Client disconnected", count: counter}));
  	});


  	
});