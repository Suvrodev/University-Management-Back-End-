import express, { Application, Request, Response } from "express";
import config from "./app/config";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send(`Student Management is running on port: ${config.port} `);
});

export default app;
