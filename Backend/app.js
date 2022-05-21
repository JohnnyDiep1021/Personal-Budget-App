const fs = require("fs");
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
// require("./src/db/mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

// front-end code can be intentionally broken/ used/ modified by the users => add validation to back-end for the inputs!

// // // cors must be set at the very beginning of the project
// // // Working with Cross Origin Resource Sharing
// // // Method - 1: manual setting
// app.use((req, res, next) => {
//   // attach headers to the response
//   // '*' allow to get accessed by all domains
//   // allow any domains to send the request
//   // ignore by Postman
//   res.setHeader(`Access-Control-Allow-Origin`, `*`);
//   res.setHeader(
//     `Access-Control-Allow-Headers`,
//     // the first two is set automatically
//     `Origin, X-Requested-With, X-Custom-Header, Content-Type, Accept, Authorization`
//   );
//   res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PATCH, DELETE`);
//   next();
// });

// // Method - 2: use cors module
const cors = require("cors");
app.use(cors());

// // Add middware for parsing request bodies here: (get request body object through req.body)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// middleware to handle image url
// express.static() => just return a file from an absolute path
app.use(
  "/src/uploads/images",
  // when the app get requested based on the defined path, it will simply return an image file from src/uploads/images
  express.static(path.join("src/uploads", "images"))
);

// const morgan = require("morgan");
// app.use(morgan("dev"));

const apiRouter = require("./src/server/api");
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (req.file) {
    // delete uploaded image  file in local folder if an error occur
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(err);
  }
  const status = err.status || 500;
  res
    .status(status)
    .json({ error: err.message || `An unknown error occurred` });
});
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2lb1a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        process.env.DB_NAME
      );
      console.log(`Server is up on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
