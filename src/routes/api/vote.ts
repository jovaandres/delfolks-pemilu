import {Router} from "express"

const voteRouter = Router();
import service from "../../services/vote"

voteRouter.post('/', ...service.vote);

export = voteRouter;
