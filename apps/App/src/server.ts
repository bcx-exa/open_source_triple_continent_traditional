import express from "express";
import { Request, Response, NextFunction } from "express";
import * as swaggerUi from "swagger-ui-express";
import * as bodyParser from "body-parser";
import { execShellCommand } from "bcx-eco-system-libary";
import * as xrayExpress from "aws-xray-sdk-express";
import * as dotenv from "dotenv-flow";
import * as path from "path";
import * as fs from "fs";
import * as AWS from "aws-sdk";
import { ValidateError } from "tsoa";
import cors from 'cors';
export class Server {
  public app: any;

  constructor() {
    //Express and body Parser
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
    this.app.use(bodyParser.json({ limit: "10mb" }));
  }

  public async Start(): Promise<void> {
    //Import env variables
    if (!process.env.SERVERLESS) {
      const dot = dotenv.config({ path: path.resolve('../../environments/') })
      // console.log("Environment Variables:", dot);
    }

    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    const env = process.env.NODE_ENV || "local";
    //console.log("process.env", process.env);

    //Configure AWS Creds
    if (!process.env.SERVERLESS) {
      credsConfigLocal();
    }

    //console.log("AWS", AWS.config);

    //Generate tsoa routes & spec
    if (!process.env.SERVERLESS) {
      fs.mkdir(
        path.resolve(process.cwd(), "src/middleware/tsoa"),
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );
      await execShellCommand("npm run tsoa");
    }

    //X-ray Segment Start
    const appName = process.env.APP_NAME || "micro-base";
    this.app.use(xrayExpress.openSegment(appName + "-startup"));

    // Cors
    this.app.use(cors());

    const routes = await import("./middleware/tsoa/routes");
    routes.RegisterRoutes(this.app);

    //Register Error Handling
    this.app.use(function errorHandler(
      err: unknown,
      req: Request,
      res: Response,
      next: NextFunction
    ): Response | void {
      if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
          message: "Validation Failed",
          details: err?.fields,
        });
      }
      if (err instanceof Error) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: err,
        });
      }
      next();
    });

    //X-Ray Segment End
    this.app.use(xrayExpress.closeSegment());

    //Swagger-UI
    this.app.use("", swaggerUi.serve, async (_req: Request, res: Response) => {
      return res.send(swaggerUi.generateHTML(await import("./middleware/tsoa/swagger.json")));
    });

    //Start Express Server
    if (!process.env.SERVERLESS) {
      const port = env === "test" ? 5000 : 7001;
      const server = this.app.listen(port, () => {
        console.log(`Server listening on port http://localhost:${port}`);
      });
      return server;
    }
  }
}

export function credsConfigLocal(): void {
  try {
    const config = new AWS.Config({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.REGION,
    });

    AWS.config.update(config);
  } catch (error) {
    console.error(error);
  }
}
