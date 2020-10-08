## Express and Sockets demo

from https://socket.io/get-started/chat/

To run (from the main directory), install the necessary dependancies

and then run 

```sh
npm src/liveUpdate/index.ts
```

Essentially, it starts a local server at 3000, and then waits for a user to send 
a message to the server through the html form by calling io.emit(\[command], \[other messages/arguments]),
which sends it to the server. io() defaults to connecting to the host that serves the page (in this case, 
localhost:3000)

Seems like a pretty easy way to connect a server to a live webpage, we just define new 
commands and call them. We can also just make some kind of UI that the producers can use to 
update the website themselves.