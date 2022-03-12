import * as mongoose from "mongoose"

const VoteSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: [true, "is required"]
    },
    candidate: {
      type: String,
      required: [true, "is required"]
    },
    code: {
      type: String,
      required: [true, "is required"]
    },
    total: {
      type: Number,
      default: 0
    }
  },
  {timestamps: true}
);

const Vote = mongoose.model("Vote", VoteSchema);

export = Vote;
