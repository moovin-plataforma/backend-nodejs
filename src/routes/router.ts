import * as express from "express";
import { promises } from "fs";

const router = express.Router();

const readFile = promises.readFile;
const writeFile = promises.writeFile;

router.post("/create", async (req, res) => {
  let account = req.body;

  try {
    let data = await readFile(globalThis.dbFileName, "utf8");
    let json = JSON.parse(data);

    account = { accountNumber: json.nextAccountNumber++, ...account };
    json.accounts.push(account);

    await writeFile(globalThis.dbFileName, JSON.stringify(json, null, 2));

    res.status(201).send("Account created successfully");
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/close/:accountNumber", async (req, res) => {
  try {
    let data = await readFile(globalThis.dbFileName, "utf8");
    let json = JSON.parse(data);
    let accounts = json.accounts.filter(
      (acc) => acc.accountNumber !== parseInt(req.params.accountNumber)
    );

    json.accounts = accounts;

    await writeFile(globalThis.dbFileName, JSON.stringify(json, null, 2));

    res.status(200).end("Account closed successfully!");
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/list/:accountType?", async (req, res) => {
  try {
    let data = await readFile(globalThis.dbFileName, "utf8");
    let json = JSON.parse(data);

    if (req.params.accountType) {
      let accounts = json.accounts.find(
        (acc) => acc.accountType === req.params.accountType
      );
      res.status(200).send(accounts);
      return;
    }

    res.status(200).send(json.accounts);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/balance/:accountNumber", async (req, res) => {
  try {
    let data = await readFile(globalThis.dbFileName, "utf8");
    let json = JSON.parse(data);
    const account = json.accounts.find(
      (acc) => acc.accountNumber === parseInt(req.params.accountNumber)
    );

    res.status(200).send(`Your current balance is: B$${account.balance}!`);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.patch("/deposit/:accountNumber", async (req, res) => {
  try {
    let value = req.body.value;

    let data = await readFile(globalThis.dbFileName, "utf8");
    let json = JSON.parse(data);
    let index = json.accounts.findIndex(
      (acc) => acc.accountNumber === parseInt(req.params.accountNumber)
    );

    if (typeof value != "number") {
      res.status(400).end("Invalid deposit value!");
      return;
    }

    if (value <= 0) {
      res.status(400).end("Invalid deposit value!");
      return;
    }

    json.accounts[index].balance += value;

    await writeFile(globalThis.dbFileName, JSON.stringify(json, null, 2));

    res.status(201).end("Deposit done successfully!");
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.patch("/withdraw/:accountNumber", async (req, res) => {
  try {
    let value = req.body.value;

    let data = await readFile(globalThis.dbFileName, "utf8");
    let json = JSON.parse(data);
    let index = json.accounts.findIndex(
      (acc) => acc.accountNumber === parseInt(req.params.accountNumber)
    );

    let currentBalance = json.accounts[index].balance;

    if (typeof value != "number") {
      res.end("Invalid deposit value!");
      return;
    }

    let balance = (currentBalance -= value + 0.3);

    if (value <= 0) {
      res.status(400).send("Invalid withdraw value!");
      return;
    } else if (balance < 0) {
      res
        .status(400)
        .send("Your balance is not enough to withdraw this amount.");
      return;
    } else if (value > 600) {
      res.status(400).send("The withdraw limit is B$600,00.");
      return;
    }

    currentBalance = balance;

    await writeFile(globalThis.dbFileName, JSON.stringify(json, null, 2));

    res.end("Get your money from the drawer!");
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
