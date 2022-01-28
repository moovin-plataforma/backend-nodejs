import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import accountsRouter from "./routes/router";

dotenv.config();

const app = express();

app.use(bodyParser.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/accounts", accountsRouter);

app.set("port", process.env.APP_PORT || 5000);

export { app };
