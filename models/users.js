const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String
      //required: true
    },
    last_name: {
      type: String
      //required: true
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    usertype: {
      type: String
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.statics.checkCrediantialsDb = async (phone, password) => {
  const user1 = await User.findOne({ phone: phone, password: password });
  if (user1) {
    return user1;
  }
};

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "foodex", {
  });
  console.log(token);
  user.tokens = user.tokens.concat({ token: token });
  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
