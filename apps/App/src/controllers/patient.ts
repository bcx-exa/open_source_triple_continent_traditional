
import {
  Controller,
  Query,
  Request,
  Response,
  SuccessResponse,
  Get,
  Put,
  Delete,
  Post,
  Body,
  Route,
  Tags,
  Path,
} from "tsoa";
import { Patient } from "../services/patient";
import { PatientInfo, PatientCheckup, PatientBase } from "../types/patient";

@Route("patient")
@Tags("Patient")
export class PatientController extends Controller { 

  /** @summary Get a Consumer's daily quotas*/
  @Post("/initialize")
  async Initialize(): Promise<any> {
    return new Patient().Initialize();
  }
  @Get("/")
  async Get(@Query() id: string, @Query() version: string): Promise<any> {
    return new Patient().Read(id, version);
  }
  @Post("/")
  async Post(@Body() body: PatientCheckup | PatientBase | PatientInfo ): Promise<any> {
    return new Patient().Create(body);
  }
}
