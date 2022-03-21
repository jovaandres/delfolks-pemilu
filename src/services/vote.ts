import {Request, Response} from "express";
import Vote from "../models/Vote";
import Token from "../models/Token";

export = {
  vote: [
    async function (req: Request, res: Response) {
      const choiceCode = req.body.choice;
      const token = req.body.token;

      let verifyToken: any = await Token.findOne({tokenId: token});
      if (verifyToken && !verifyToken.used) {
        let vote: any = await Vote.findOne({code: choiceCode});
        await Vote.findOneAndUpdate({code: choiceCode}, {total: vote.total + 1});
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
