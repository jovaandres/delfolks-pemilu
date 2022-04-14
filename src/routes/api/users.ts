import {Response, Router} from "express"

const userRouter = Router();
import service from "../../services/users"
import auth from "../../middlewares";

userRouter.post('/', ...service.create);
userRouter.post('/generate', ...service.generate)
userRouter.post('/setPasswordAndSend', ...service.setPasswordAndSend)
userRouter.post('/read', ...service.markNotes)

userRouter.get('/', auth.requireAuthUser, function (req: any, res: Response) {
  return res.json({
    user: req.authUser.authSerialize(false),
  })
})

userRouter.post('/login', ...service.login);

export = userRouter;
