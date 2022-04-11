import {Request, Response} from "express";
import crypto from "crypto";
import Token from "../models/Token";
import User from "../models/User";


const generateToken: any = async () => {
  let token = crypto.randomBytes(4).toString('hex');
  let exist = await Token.count({tokenId: token});
  if (exist) {
    return await generateToken();
  } else {
    return token;
  }
}

export = {
  getToken: [
    async function (req: Request, res: Response) {
      let userid = req.body.user.id;
      let user: any = await User.findById(userid);
      if (!user.readNote) {
        return res.json({
          error: true,
          message: "Read notes first!"
        })
      }
      if (!user.claimed) {
        let newToken = await generateToken();
        let token: any = new Token({
          tokenId: newToken,
          used: false
        });
        await token.save();
        await User.findByIdAndUpdate(userid, {claimed: true});
        return res.json({
          error: false,
          token: newToken
        })
      } else {
        return res.json({
          error: true,
          message: "You have claimed token!"
        })
      }
    }
  ],
  markToken: [
    async function (req: Request, res: Response) {
      let token = req.body.token;
      await Token.findOneAndUpdate({tokenId: token}, {used: true});
      return res.status(200);
    }
  ]
};
