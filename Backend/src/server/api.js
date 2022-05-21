const express = require("express");
const apiRouter = express.Router();

const envelopeRouter = require("./envelopes");
apiRouter.use("/envelopes", envelopeRouter);

const userRouter = require("./users");
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
