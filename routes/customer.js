import { Router } from "express";
import { CheckUserIsValid } from "../middlewares/securityChecker.js";
import { getCustomer, getSingleCustomer } from "../controller/customer.js";

export const customerRoute = Router()

customerRoute.get('/customertable',CheckUserIsValid,getCustomer);
customerRoute.get("/customer/:id",CheckUserIsValid,getSingleCustomer);