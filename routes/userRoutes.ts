import { Router } from "express";
import { addUser, loginUser, logoutUser } from "../controllers/userControllers";
import { ValidationMiddleware } from "../middleware/validationMiddleware";
import { AddUserSchema, LoginUserSchema } from "../schemas/userSchema";
//import passport from "../utils/passport";
import {
   generateOAuthToken,
    handleOAuthCallback
} from "../middleware/outhMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.post('/users', 
    ValidationMiddleware({ type: 'body', schema: AddUserSchema, refType: 'joi' }),
    addUser
);

userRouter.post('/login', 
    ValidationMiddleware({ type: 'body', schema: LoginUserSchema, refType: 'joi' }),
    loginUser
);


userRouter.post('/logout', authMiddleware, logoutUser);

export { userRouter };