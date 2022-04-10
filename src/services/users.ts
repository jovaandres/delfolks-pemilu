import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import * as XLSX from "xlsx";
import path from "path";
import {isBodyMissingProps} from "../utils/isBodyMissingProps";
import userPassport from "../config/passport";

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
    (req: Request, res: Response, next: NextFunction) => {
      let filePath = path.resolve(__dirname,'dpt.xlsx');
      let workbook = XLSX.readFile(filePath, { type: 'binary' , cellDates: true });
      let sheet_name_list = workbook.SheetNames;
      let data: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      data.forEach((student: any) => {
        let newUser: any = new User({
          email: student.Email,
          name: student.Nama,
          dateOfBirth: student.TanggalLahir,
          generation: student.Angkatan,
          phoneNumber: student.NomorTelepon,
          nis: student.NIS,
        });
        newUser.setPassword(student.NIS.toString());
        newUser.save();
      });
      return res.json({
        error: false,
        message: "Import data success"
      });
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
  ]
};
