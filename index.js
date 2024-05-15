const express=require('express');
const mongoose=require('mongoose');
const cors = require("cors");

require('dotenv').config();
const app=express()
app.use(cors());
app.use(express.json());


app.use('/api/tasks',require('./src/routes/api/tasks'));
app.use('/api/auth',require('./src/routes/api/authentication'));
app.use('/api/category',require('./src/routes/api/categories'));
app.use('/api/profile',require('./src/routes/api/profile'));
app.use('/api/search',require('./src/routes/api/search'));


 mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db=mongoose.connection
db.on("error", (error) => {
    console.log("Mongodb occure error : ", error);
  });
db.once("open", () => {
    console.log("Mongodb connected sucessfully!");
    const port = process.env.CONNECTION_PORT;
    app.listen(port, () => {
      console.log(`server is running on ${port} port`);
    });
  });