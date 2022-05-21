const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Envelope = require("./envelope");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 2,
      maxlength: 46,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      minlength: 6,
      maxlength: 36,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 254,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error(`Email is invalid. Try again!`);
        }
      },
    },
    password: {
      type: String,
      minLength: 8,
      trim: true,
      required: true,
      validate(val) {
        if (val.toLowerCase().includes("password"))
          throw new Error(`Password field cannot contain 'password'`);
      },
    },
    image: {
      type: String,
      trim: true,
    },
    expertise: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    balance: {
      type: Number,
      default: 0,
      validate(val) {
        if (val < 0) throw new Error(`Balance must be positive`);
      },
    },
    envelopes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Envelopes",
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
// // Set up virtual property
// userSchema.virtual("envelopes", {
//   ref: "Envelopes",
//   localField: "_id",
//   foreignField: "owner",
// });

// define instance method
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.methods.toJSON = function () {
  const user = this;

  // get the actual user object in database which can be modified directly
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

// define model method
userSchema.statics.findByCredentials = async function ({
  password,
  email,
  username = undefined,
} = {}) {
  try {
    if ((!email && !username) || !password) {
      throw Error(`Email/ username and password are required to login!`);
    }
    let user;
    if (email) user = await User.findOne({ email });
    if (username) user = await User.findOne({ username });
    if (!user) {
      throw Error(`Invalid email/ username or password`);
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw Error(`Invalid email/ username or password`);
    }

    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getProperty = async function () {
  // console.log(Object.keys(this.db));
  return Object.keys(this.schema.obj);
};
// define a middleware (called instance method) running before the a user data is saved
userSchema.pre("save", async function (next) {
  const user = this;
  // console.log(user);
  // only create hashedPassword if new users are created or existing password is updated)

  if (user.expertise) {
    user.expertise = user.expertise
      .split(" ")
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
      .join(" ");
  }

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

// userSchema.pre("get", async function (next) {
//   next();
// });
// Delete user envelopes when user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await Envelope.deleteMany({ owner: user._id });
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
