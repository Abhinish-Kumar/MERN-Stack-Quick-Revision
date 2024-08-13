# MERN-Stack-Quick-Revision
Simplest way to learn MERN  Stack


### 1. Create a server in express js that shows "Hello World" on browser at same Port?

```javascript
const express = require("express");
const app = express();

//By default any Browser make get request to get data from server

app.get("/", (req, res) => {
  //send response to browser
  res.send("Hello World");
});

app.listen(4400, () => {
  console.log(
    "This message will be seen at Server side when any browser send request to the same port of this server"
  );
});

```


### 2. WHat is nodemon why we use it?




















