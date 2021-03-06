import * as mongoose from "mongoose"
import crypto from "crypto";
import uniqueValidator from "mongoose-unique-validator"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      required: [true, "is required"]
    },
    name: {
      type: String,
      required: [true, "is required"]
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    generation: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    nis: {
      type: Number,
      required: true
    },
    readNote: {
      type: Boolean,
      default: false
    },
    claimed: {
      type: Boolean,
      default: false
    },
    voted: {
      type: Boolean,
      default: false
    },
    salt: String,
    hash: String,
    suspended: {type: Boolean, default: true}
  },
  {timestamps: true}
);

UserSchema.plugin(uniqueValidator, {type: "mongoose-unique-validator"});

UserSchema.methods.setPassword = function (password: any) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function (password: any) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 30);

  return jwt.sign(
    {
      sub: "user",
      id: this._id,
      exp: parseInt(String(exp.getTime() / 1000))
    },
    process.env.APP_SECRET || "secret"
  );
};

UserSchema.methods.authSerialize = function (accessToken = true) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    nis: this.nis,
    accessToken: (() => {
      if (!accessToken) {
        return undefined;
      }
      return this.generateJWT();
    })()
  };
};

const User = mongoose.model("User", UserSchema);

export = User;
