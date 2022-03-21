import {Router} from "express"

const voteRouter = Router();
import service from "../../services/token"

voteRouter.post('/', ...service.getToken);
voteRouter.post('/mark', ...service.markToken);

export = voteRouter;
