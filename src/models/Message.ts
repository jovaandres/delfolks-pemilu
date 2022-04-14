import * as mongoose from "mongoose"

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "is required"]
    },
    email: {
      type: String,
      required: [true, "is required"]
    },
    message: {
      type: String,
      required: [true, "is required"]
    }
  },
  {timestamps: true}
);

const Message = mongoose.model("Message", MessageSchema);

export = Message;
