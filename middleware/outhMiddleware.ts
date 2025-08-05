import { Request, Response, NextFunction } from "express";
import { User } from "../DB/db";
import { generateToken } from "../utils/helpers";
import { ResponseService } from "../utils/response";

export interface IRequestUser extends Request {
    token?: string;
    user?: any;
}

export const generateOAuthToken = async (req: IRequestUser, res: Response, next: NextFunction) => {
    try {
        const user = req.user as any;

        if (!user) {
            return ResponseService({
                data: null,
                status: 401,
                success: false,
                message: "User not found",
                res
            });
        }

        const token = await generateToken({
          id: user.id,
          email: user.email,

        });

        req.token = token;
        req.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        
        next();
    } catch (error) {
        const { message, stack } = error as Error;
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
};

export const handleOAuthCallback = (req: IRequestUser, res: Response, next: NextFunction) => {
    try {
        const token = req.token;
        const user = req.user;

        if (!token || !user) {
          return ResponseService({
            data: null,
            status: 400,
            success: false,
            message: "Token generation failed",
            res,
          });
        }

        return ResponseService({
          data: token,
          status: 200,
          success: true,
          message: "Login successful",
          res,
        });
    } catch (error) {
        const { message, stack } = error as Error;
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
};