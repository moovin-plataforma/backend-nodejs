import { Router } from "express";
import { AccountController } from "./controllers/AccountController";

const router = Router();

const accountController = new AccountController();

router.post("/createAccount", accountController.createAccount);
router.post("/withdraw", accountController.withdraw);
router.post("/deposit", accountController.deposit);
router.get("/checkAccount/:code", accountController.checkAccount);


export { router };