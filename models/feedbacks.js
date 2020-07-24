const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    u_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
      type: String
    },
    feedback: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
