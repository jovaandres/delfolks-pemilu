import {Request, Response} from "express";
import Vote from "../models/Vote";

export = {
  vote: [
    async function (req: Request, res: Response) {
      const choiceCode = req.body.choice;
      let vote: any = await Vote.findOne({code: choiceCode});
      await Vote.findOneAndUpdate({code: choiceCode}, {total: vote.total + 1});
      return res.json({
        error: false
      });
    }
  ]
};
