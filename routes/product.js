import { Router } from "express";
import { CheckUserIsValid } from "../middlewares/securityChecker.js";
import { getProduct, getSingleProduct } from "../controller/product.js";

export const productRoute = Router()
productRoute.get('/product_table',CheckUserIsValid,getProduct);
productRoute.get('/product/:id',CheckUserIsValid,getSingleProduct);