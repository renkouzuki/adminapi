import { Router } from "express";
import { CheckUserIsValid } from "../middlewares/securityChecker.js";
import { getEmployee, getSingleEmployee } from "../controller/employee.js";

export const employeeRoute = Router()

employeeRoute.get('/employee_table',CheckUserIsValid,getEmployee);
employeeRoute.get('/employee/:id',CheckUserIsValid,getSingleEmployee);