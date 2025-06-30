const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");

mongoose.connect("mongodb://localhost:27017");

app.use(express.json());
const userSchema = new mongoose.Schema({
  name: String,
  profileImage: {
    contentType: String,
    data: Buffer,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userModel = mongoose.model("userDDDBB", userSchema);

app.post("/", upload.single("fileName"), async (req, res) => {
  console.log(req.body.name);
  let datares = await userModel.create({
    name: req.body.name,
    ...(req.file && {
      profileImage: {
        contentType: req.file.mimetype,
        data: req.file.buffer,
      },
    }),
  });

  res.send(`
              <h1>Your data is here</h1>
              <img src="data:${
                req.file.mimetype
              };base64,${req.file.buffer.toString("base64")}"  />
              `);
});

app.listen(4000);
