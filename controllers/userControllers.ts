import { Request, response, Response } from "express";
import { ResponseService } from "../utils/response";
import { AddUserInterface, UserInterface } from "../types/userinterface";
import { Database } from "../DB/db";
import { IRequestUser } from "../middleware/authMiddleware";
import { 
    hashPassword, 
    comparePassword,
    generateToken,
    destroyToken
     
    
} from "../utils/helpers";

interface IRequestUserData extends Request {
    body: AddUserInterface;
}


export const addUser = async (req: IRequestUserData, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const userExists = await Database.User.findOne({ where: { email } });
        if (userExists) {
            return ResponseService({
                data: null,
                status: 409,
                success: false,
                message: "User already exists",
                res
            });
        }

        const newUser = await Database.User.create({
            firstName,
            lastName,
            email,
            password: await hashPassword(password),
            
        })
        ResponseService({
            data: newUser,
            status: 201,
            success: true,
            message: 'User added successfully',
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error creating user:', { message, stack });
        
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
}

export const loginUser = async (req: IRequestUserData, res: Response) => {
    try {
        const { email, password } = req.body;

        
        const user = await Database.User.findOne({ where: { email } });
        if (!user) {
            return ResponseService({
                data: null,
                status: 404,
                success: false,
                message: "User not found",
                res
            });
        }

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            return ResponseService({
                data: null,
                status: 401,
                success: false,
                message: "Invalid email or password",
                res
            });
        }

        const token = await generateToken({ id: user.id, email: user.email });

        ResponseService({
            data: { token },
            status: 200,
            success: true,
            message: "Login successful",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        console.error('Error logging in user:', { message, stack });

        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
}

export const logoutUser = async (req: IRequestUser, res: Response) => {
    try {
        const token = req.token;
        
        if (!token) {
            return ResponseService({
                data: null,
                status: 400,
                success: false,
                message: "No token found",
                res
            });
        }
        await destroyToken(token);

        ResponseService({
            data: null,
            status: 200,
            success: true,
            message: "Logout successful",
            res
        });
    } catch (err) {
        const { message, stack } = err as Error;
        ResponseService({
            data: { message, stack },
            status: 500,
            success: false,
            res
        });
    }
}