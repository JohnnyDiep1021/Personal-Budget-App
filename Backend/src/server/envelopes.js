const envelopesRouter = require("express").Router();
const auth = require("../middleware/auth");

// 3rd party module/lib
const { check, validationResult } = require("express-validator");
const lodash = require("lodash");
/*
// http://expressjs.com/en/resources/middleware/errorhandler.html
const errorhandler = require("errorhandler");
if (process.env.NODE_ENV === "development") {
  // only use in development
  envelopesRouter.use(errorhandler({ log: false }));
}
*/

const Envelope = require("../db/model/envelope");
const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabaseById,
  deleteAllFromDatabase,
  transferBudget,
  isBalanceEnough,
} = require("./utils");
const User = require("../db/model/user");

// router.param() will run before router.use()
// METHOD-1 => using router.param() cannot accept auth middleware function => fail to authenticate user
// envelopesRouter.param("envelopeId", async (req, res, next, envelopeId) => {})

// METHOD-2 => using router.use() will be more efficient coz it can perform authentication by using auth middleware function for every route handler with "/:envelopeId"

// envelopesRouter.use(/\/\:envelopeId$/, auth, async (req, res, next) => { }
// $ will mark the end of an URL endpoint and this app.use will only get applied for any path which terminates with the envelopeId  => the other paths which do not end with envelopeId still work.
envelopesRouter.use("/:envelopeId$", auth, async (req, res, next) => {
  // next() middleware will not stop the execution of the code following it, use return next() instead
  try {
    const envelope = await getFromDatabaseById(
      "envelopes",
      { envelopeId: req.params.envelopeId },
      req.user._id
    );
    if (!envelope) {
      const err = new Error("Cannot find envelope with the provided Id");
      err.status = 404;
      throw err;
      // return next(err);
      // return res.status(404).send()
    }
    req.envelope = envelope;
    next();
  } catch (err) {
    next(err);
  }
});

// POST/CREATE new envelope
envelopesRouter.post(
  "/",
  auth,
  [
    check("category").not().isEmpty(),
    check("budget").isNumeric({ min: 0 }),
    check("notes").isArray({ max: 4 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(
          `Invalid inputs passed for creating envelopes! Please try again.`
        );
      }
      // if (!isBalanceEnough(req.body.budget, req.user.balance))
      //   throw new Error(
      //     "Balance is inadequate to deposit money into the envelope"
      //   );
      // console.log(req.body, typeof req.body);
      const newEnvelope = await addToDatabase(
        "envelopes",
        req.body,
        req.user._id
      );
      console.log("Envelope added!", newEnvelope);
      res
        .status(201)
        .json({ envelope: newEnvelope.toObject({ getters: true }) });
    } catch (error) {
      error.status = 400;
      error.message =
        error.message ||
        "Missing requisite information to create a new envelope";
      next(error);
      // res.status(400).send(error);
    }
  }
);

// GET/READ all envelopes
envelopesRouter.get("/", auth, async (req, res, next) => {
  try {
    const data = await getAllFromDatabase("envelopes", req.user._id);
    if (!data) {
      const err = new Error(`No data was found!`);
      // err.status = 404;
      throw err;
    }
    res.json({ envelopes: data.map((ele) => ele.toObject({ getters: true })) });
  } catch (error) {
    next(error);
    // res.status(500).send(error);
  }
});

// GET/READ envelope by Id
envelopesRouter.get("/:envelopeId", auth, async (req, res, next) => {
  // console.log(req.params);
  try {
    res.json({ envelope: req.envelope.toObject({ getters: true }) });
  } catch (error) {
    next(error);
    // res.status(500).send(error);
  }
});

// PUT/PATCH/UPDATE envelope by Id
envelopesRouter.patch(
  "/:envelopeId",
  [
    check("category").not().isEmpty(),
    check("budget").isNumeric({ min: 0 }),
    check("notes").isArray({ max: 4 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        throw new Error(
          `Invalid inputs passed for updating envelopes! Please try again!`
        );
      }
      // if (!isBalanceEnough(req.body.budget, req.user.balance)) {
      //   const err = Error(
      //     "Balance is inadequate to deposit money into the envelope"
      //   );
      //   err.status = 400;
      //   throw err;
      // }
      const updatedEnvelope = await updateInstanceInDatabase(
        "envelopes",
        req.body,
        undefined,
        req.user._id,
        req.envelope
      );

      if (updatedEnvelope.error) {
        const err = new Error(updatedEnvelope.error);
        err.status = 400;
        return next(err);
        // return res.status(400).send(updatedEnvelope.error);
      }
      res.json({ envelope: updatedEnvelope });
    } catch (error) {
      next(error);
      // res.status(500).send(error);
    }
  }
);

// TRANSFER BUDGET
envelopesRouter.post(
  "/transfer/:from/:to",
  auth,
  [check("amount").isFloat({ min: 0 })],
  async (req, res, next) => {
    console.log(req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(`Amount must be postive`);
      }
      console.log(req.params);
      const transfer = await transferBudget(req.params, req.body, req.user._id);

      if (transfer.error) {
        const err = new Error(transfer.error);
        err.status = 404;
        return next(err);
        // return res.status(404).send(transfer.error)
      }
      res.json({ message: "Transfer budget successfully!" });
    } catch (error) {
      next(error);
      // res.status(500).send();
    }
  }
);

// DELETE an envelope by envelopeId
envelopesRouter.delete("/:envelopeId", async (req, res, next) => {
  try {
    const deletedEnvelope = await deleteFromDatabaseById(
      "envelopes",
      req.envelope
    );
    // return res.status(204).send(); // normally, 204 is status code for delete operation  => there is no content to send for this request
    return res.status(200).json({ message: "Delete envelope successfully!" });
  } catch (error) {
    next(error);
  }
});

// DELETE all envelopes
envelopesRouter.delete("/", auth, async (req, res, next) => {
  try {
    const deletedEnvelopes = await deleteAllFromDatabase(
      "envelopes",
      req.user._id
    );
    if (deletedEnvelopes === 0) {
      const err = new Error(`No envelope(s) to delete`);
      err.status = 400;
      return next(err);
    }
    res.status(200).json({ message: "Delete all envelopes successfully!" });
  } catch (error) {
    next(error);
  }
});

// // error-handler middleware
// envelopesRouter.use((err, req, res, next) => {
//   const status = err.status || 500;
//   res.status(status).json({ error: err.message });
// });

module.exports = envelopesRouter;
