import { Router } from "express";
import { CheckUserIsValid } from "../middlewares/securityChecker.js";
import { getPurchase, getSinglePurchase } from "../controller/purchase.js";

export const purchaseRoute = Router();
purchaseRoute.get('/purchase_table',CheckUserIsValid,getPurchase);
purchaseRoute.get('/purchase/:id',CheckUserIsValid,getSinglePurchase);