require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth.routes.js')
const homeRoutes = require('./routes/home.routes.js');
const adminRoutes = require('./routes/admin.routes.js')
const uploadImageRoutes = require('./routes/image-routes.js')

mongoose
  .connect(
    process.env.MONGO_DB
  )
  .then(() => console.log("MongoDB connected successfull"))
  .catch((e) => console.log(e));



const app = express();
const PORT = 3000;

app.use(express.json())



app.use('/api/auth',authRoutes)
app.use('/api/home',homeRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/image',uploadImageRoutes)





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

