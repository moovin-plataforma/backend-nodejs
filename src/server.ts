import { app } from "./app";
import { promises } from "fs";

const readFile = promises.readFile;
const writeFile = promises.writeFile;

globalThis.dbFileName = "accounts.json";

app.listen(app.get("port"), async () => {
  try {
    const t = await readFile(globalThis.dbFileName, "utf8");
    console.log(
      "App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
  } catch (err) {
    const initialJson = {
      model: "{accountNumber: 1, accountType: 'checking/savings', 'name': 'Fulano', 'balance': 0000}",
      nextAccountNumber: 1,
      accounts: [],
    };
    writeFile(globalThis.dbFileName, JSON.stringify(initialJson, null, 2)).catch(
      (err) => {
        console.log(err);
      }
    );
  }
});
