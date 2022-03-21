import * as mongoose from "mongoose"

const TokenSchema = new mongoose.Schema(
  {
    tokenId: {
      type: String,
      unique: true,
      required: [true, "is required"]
    },
    used: {
      type: Boolean,
      default: false
    }
  },
  {timestamps: true}
);

const Token = mongoose.model("Token", TokenSchema);

export = Token;
