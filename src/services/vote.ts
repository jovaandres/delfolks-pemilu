import {Request, Response} from "express";
import Vote from "../models/Vote";
import Token from "../models/Token";
import User from "../models/User";

export = {
  vote: [
    async function (req: Request, res: Response) {
      const choiceCode = req.body.choice;
      const token = req.body.token;
      const userId = req.body.user.id;

      let verifyUser: any = await User.findById(userId);
      if (verifyUser.voted) {
        return res.json({
          error: true,
          message: "You have voted!"
        });
      }

      let verifyToken: any = await Token.findOne({tokenId: token});
      if (verifyToken && !verifyToken.used) {
        let vote: any = await Vote.findOne({code: choiceCode});
        await Vote.findOneAndUpdate({code: choiceCode}, {total: vote.total + 1});
        await User.findByIdAndUpdate(userId, {voted: true});
        return res.json({
          error: false
        });
      } else {
        return res.json({
          error: true,
          message: "Token invalid or used!!!"
        })
      }
    }
  ]
};
