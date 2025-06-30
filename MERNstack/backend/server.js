const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect("mongodb://localhost:27017/userDatabase");
const User = new mongoose.Schema({
  name: String,
  bio: String,
  email: String,
  number: String,
  profilePicture: {
    contentType: String,
    data: Buffer,
  },
});
const userModel = mongoose.model("userDataBase", User);

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  let user = await userModel.findOne({ name: "Abhinish" });
  const base64 = user.profilePicture.data.toString("base64");
  const imgSrc = `data:${user.profilePicture.contentType};base64,${base64}`;
  // console.log({ ...user, profilePicture: imgSrc });
  res.json({
    ...user.toObject(),
    profilePicture: imgSrc,
  });
});

app.post("/", upload.single("profilePicture"), async (req, res) => {
  console.log(req.body);
  const { name, bio, email, number } = req.body;
  let resp = await userModel.create({
    name,
    bio,
    email,
    number,
    ...(req.file && {
      profilePicture: {
        contentType: req.file.mimetype,
        data: req.file.buffer,
      },
    }),
  });
  console.log(resp);
  res.json({ body: "request submitted successfully" });
});



app.listen(3000);
