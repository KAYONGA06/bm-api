import { userRouter } from "./userRoutes";

import { Router } from "express";

export const routers = Router();
routers.use('/api/v1',userRouter)
