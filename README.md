# MERN-Stack-Quick-Revision
Simplest way to learn MERN  Stack

https://www.geeksforgeeks.org/full-stack-developer-roadmap/

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


### 3. Send get data from server to frontend?

```javascript
//fronted
import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:4400/")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>Your form is submitted</h1>
    </>
  );
}

export default App;

```


```javascript
//backend
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello This is abhinish from this side");
});

app.post("/", (req, res) => {
  let { name, age, password } = req.body;
  console.log(name, age, password);
  res.send("Successfully form submitted");
});

app.listen(4400);

```

### 4. Send the form data from the react and recieve from node js server with POST request.

```javascript
import axios from "axios";
import { useState } from "react";

function App() {
  let [data, setData] = useState({});

  function setDataOnchange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  }

  async function sendToServer() {
    await axios.post("http://localhost:4400/", data);
  }
  return (
    <>
      <h1>Form Data</h1>
      <input type="text" name="name" onChange={setDataOnchange} />
      <input type="number" name="age" onChange={setDataOnchange} />
      <input type="password" name="password" onChange={setDataOnchange} />
      <button onClick={sendToServer}>Submit</button>
    </>
  );
}

export default App;

```


```javascript
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello This is abhinish from this side");
});

app.post("/", (req, res) => {
  let { name, age, password } = req.body;
  console.log(name, age, password);
  res.send("Successfully form submitted");
});

app.listen(4400);

```

### 5. Send form data from frontend and save to mongodb with mongoose by the server of node js.


```javascript
//frontend
import axios from "axios";
import { useState } from "react";

function App() {
  let [data, setData] = useState({});

  function setDataOnchange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  }

  async function sendToServer() {
    let response = await axios.post("http://localhost:4400/", data);
    alert(response.data);
  }
  return (
    <>
      <h1>Form Data</h1>
      <input type="text" name="name" onChange={setDataOnchange} />
      <input type="number" name="age" onChange={setDataOnchange} />
      <input type="password" name="password" onChange={setDataOnchange} />
      <button onClick={sendToServer}>Submit</button>
    </>
  );
}

export default App;

```

```javascript
//Backend
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/FormDataStudent");

let studentSchema = new mongoose.Schema({
  name: String,
  age: String,
  password: String,
});

let Student = mongoose.model("Student", studentSchema);

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello This is abhinish from this side");
});

app.post("/", (req, res) => {
  let { name, age, password } = req.body;
  console.log(name, age, password);

  let amit = new Student({
    name: name,
    age: age,
    password: password,
  });

  amit.save();
  res.send("Successfully form submitted");
});

app.listen(4400);

```

### 6. Write a node js server for register and login the suer 

```javascript
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/FormDataStudent");

let studentSchema = new mongoose.Schema({
  name: String,
  age: String,
  password: String,
});

let Student = mongoose.model("Student", studentSchema);

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello This is abhinish from this side");
});

app.post("/register", (req, res) => {
  let { name, age, password } = req.body;
  console.log(name, age, password);

  let amit = new Student({
    name: name,
    age: age,
    password: password,
  });

  amit.save();
  res.send("Successfully form submitted");
});

//middleware to check the valid user
async function checkUser(req, res, next) {
  let validUser = false;
  let { name, password } = req.body;
  let data = await Student.findOne({ name: name, password: password }).exec();

  if (data) {
    console.log("Your middlw ware is working", data);
    next();
  } else {
    res.status(401).send("Not a valid user");
  }
}

app.post("/login", checkUser, async (req, res) => {
  res.send("You are successfully Logedin");
});

app.listen(4400);

```

### 7. Create a register and login with frontend(react js).

```javascript
//Server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/FormDataStudent");

let studentSchema = new mongoose.Schema({
  name: String,
  age: String,
  password: String,
});

let Student = mongoose.model("Student", studentSchema);

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello This is abhinish from this side");
});

app.post("/register", (req, res) => {
  let { name, age, password } = req.body;
  console.log(name, age, password);

  let amit = new Student({
    name: name,
    age: age,
    password: password,
  });

  amit.save();
  res.send("Successfully form submitted");
});

//middleware to check the valid user
async function checkUser(req, res, next) {
  // let validUser = false;
  let { name, password } = req.body;
  let data = await Student.findOne({ name: name, password: password }).exec();

  if (data) {
    console.log("Your middlw ware is working", data);
    next();
  } else {
    res.send("Not a valid user, 1st register");
  }
}

app.post("/login", checkUser, async (req, res) => {
  res.send("You are successfully Logedin");
});

app.listen(4400);

```


```javascript
//frontend page 1
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);

```

```javascript
//frontend page 2
import Login from "./Login";
import Register from "./Register";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <Link to="/register">register</Link>
        <Link to="/login">login</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

```

```javascript
//frontend page 3 register page
import axios from "axios";
import { useState } from "react";
import "./Register.css";

function Register() {
  let [data, setData] = useState({});

  function setDataOnchange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  }

  async function sendToServer() {
    let response = await axios.post("http://localhost:4400/register", data);
    alert(response.data);
  }
  return (
    <>
      <form>
        <h1>Register</h1>
        <input
          type="text"
          name="name"
          onChange={setDataOnchange}
          placeholder="Enter name"
        />
        <input
          type="number"
          name="age"
          onChange={setDataOnchange}
          placeholder="Enter age"
        />
        <input
          type="password"
          name="password"
          onChange={setDataOnchange}
          placeholder="Enter password"
        />
        <button onClick={sendToServer}>Submit</button>
      </form>
    </>
  );
}

export default Register;

```

```javascript
//Frontend paeg 4 login page
import axios from "axios";
import { useState } from "react";
import "./Register.css";

function Login() {
  let [data, setData] = useState({});

  function setDataOnchange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  }

  async function sendToServer() {
    let response = await axios.post("http://localhost:4400/login", data);
    alert(response.data);
  }
  return (
    <>
      <form>
        <h1>Login</h1>
        <input
          type="text"
          name="name"
          onChange={setDataOnchange}
          placeholder="Enter name"
        />
        <input
          type="password"
          name="password"
          onChange={setDataOnchange}
          placeholder="Enter password"
        />
        <button onClick={sendToServer}>Submit</button>
      </form>
    </>
  );
}

export default Login;

```


















