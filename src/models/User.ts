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
      required: [true, "is required"],
      match: [/\S+@\S+\.\S+/, "is invalid"]
    },
    firstName: {
      type: String,
      required: [true, "is required"]
    },
    lastName: {
      type: String,
      required: [true, "is required"]
    },
    dateOfBirth: {
      type: Date,
      required: false
    },
    generation: {
      type: Number,
      required: false,
      min: 1,
      max: 7
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    nis: {
      type: Number,
      required: false
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
    suspended: {type: Boolean, default: false}
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
    firstName: this.firstName,
    lastName: this.lastName,
    isEmailConfirmed: this.isEmailConfirmed,
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
