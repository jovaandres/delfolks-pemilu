import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import * as XLSX from "xlsx";
import path from "path";
import {isBodyMissingProps} from "../utils/isBodyMissingProps";
import userPassport from "../config/passport";
import transporter from "../utils/mailer";
import crypto from "crypto";
import Message from "../models/Message";

const generatePassword: any = async () => {
  return crypto.randomBytes(3).toString('hex');
}

export = {
  create: [
    function (req: Request, res: Response, next: NextFunction) {
      const requiredProps = [
        ['email', 'Your email is required', true],
        ['firstName', 'Your first name is required.', true],
        ['password', 'A password is required', true],
        ['lastName', 'Your last name is required', true]
      ];

      const {hasMissingProps, propErrors} = isBodyMissingProps(
        requiredProps,
        req.body
      );

      if (hasMissingProps) {
        return next({
          name: "ValidationError",
          errors: propErrors
        });
      }

      const {
        email,
        firstName,
        lastName,
        password,
      } = req.body;

      return User.count({email})
        .exec()
        .then(function (count) {
          if (count > 0) {
            throw {
              name: "ValidationError",
              errors: {
                email: {message: "The email is already taken"}
              }
            };
          }
          return count;
        })
        .then(() => {
          const user: any = new User({
            email,
            firstName,
            lastName,
          });

          user.setPassword(password);
          return user
            .save()
            .then(function (user: any) {
              return res.json({success: true, user: user.authSerialize()});
            })
        })
        .catch(next);
    },
  ],
  generate: [
    (req: Request, res: Response) => {
      let filePath = path.resolve(__dirname,'dpt.xlsx');
      let workbook = XLSX.readFile(filePath, { type: 'binary' , cellDates: true });
      let sheet_name_list = workbook.SheetNames;
      let data: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
      data.forEach((student: any) => {
        let newUser: any = new User({
          email: student.Email,
          name: student.Nama,
          dateOfBirth: student.TanggalLahir,
          generation: student.Angkatan,
          phoneNumber: student.NomorTelepon,
          nis: student.NIS,
        });
        newUser.save();
      });
      return res.json({
        error: false,
        message: "Import data success"
      });
    }
  ],
  setPasswordAndSend: [
    async function (req: Request, res: Response) {
      let userdata = await User.find().limit(1).select('email');
      userdata.forEach(async (data: any) => {
        console.log(data.email);
        let newPassword = await generatePassword();
        let newSalt = crypto.randomBytes(16).toString("hex");
        let newHash = crypto
          .pbkdf2Sync(newPassword, newSalt, 10000, 512, "sha512")
          .toString("hex");
        await User.findByIdAndUpdate(data.id, {salt: newSalt, hash: newHash, suspended: false}, {upsert: true});
        transporter.sendMail({
          from: '"Jova Andreas" admin@delfolks.my.id',
          to: data.email,
          subject: "Your password for pemilu delfolks",
          html: "<p>Terimakasih telah mendaftar sebagai pemilih tetap pemilu Del Folks 2022. Email ini dikirim otomatis ketika pendaftaran berhasil. Password akun anda akan dikirimkan bersama dengan email ini</p><br><strong>Your password: " + newPassword +"</strong>"
        })
      })
      return res.json({
        error: false,
        message: "Password generated successfully"
      })
    }
  ],
  login: [
    (req: Request, res: Response, next: NextFunction) => {
      const requiredProps = [
        ['email', 'Your email and password are required to sign in.', true],
        ['password', 'Your email and password are required to sign.', true],
      ];
      const {hasMissingProps, propErrors} = isBodyMissingProps(requiredProps, req.body);
      if (hasMissingProps) {
        return next({
          name: "ValidationError",
          errors: propErrors
        });
      }
      return next()
    },
    (req: Request, res: Response, next: NextFunction) => userPassport.authenticate("local", function (err, user, data) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next({...data, success: false});
      }

      return res.json({success: true, user: user.authSerialize()});
    })(req, res, next),
  ],
  markNotes: [
    async function (req: Request, res: Response) {
      let userid = req.body.user.id;
      await User.findByIdAndUpdate(userid, {readNote: true});
      res.json({
        error: false,
        message: "Note read"
      })
    }
  ],
  getMsg: [
    async function (req: Request, res: Response) {
    let allMessage = await Message.find({});
    return res.json({
      data: allMessage
    });
    }
  ],
  sendHelp: [
    async function (req: Request, res: Response, next: NextFunction) {
      const requiredProps = [
        ['name', 'Your name is required', true],
        ['email', 'Your email is required', true],
        ['message', 'Your message is required', true],
      ];
      const {hasMissingProps, propErrors} = isBodyMissingProps(requiredProps, req.body);
      if (hasMissingProps) {
        return next({
          name: "ValidationError",
          errors: propErrors
        });
      }
      let {name, email, message} = req.body;
      let newMessage: any = new Message({
        name: name,
        email: email,
        message: message
      })
      await newMessage.save();

      res.json({
        error: false,
        message: "Pesan telah terkirim!"
      })
    }
  ]
};
