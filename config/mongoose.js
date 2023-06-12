const mongoose = require('mongoose')

mongoose
   .connect("mongodb://127.0.0.1:27017/kodcampus")
   .then(() => console.log('DB connection successful'));