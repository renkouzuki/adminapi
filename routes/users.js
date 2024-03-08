import { Router } from "express";
import { CheckUserIsValid } from "../middlewares/securityChecker.js";
import { getSingleUser, getUser } from "../controller/user.js";

export const userRoute = Router()

userRoute.get('/user_table',CheckUserIsValid,getUser);
userRoute.get('/users/:id',CheckUserIsValid,getSingleUser);