export class PatientInfo {
  id: string;
  version: string;
  type: string;
  firstName: string;
  lastName: string;
  bloodTypes: string;
  gender: string;
  age: number;
  race: string;
}

export class PatientBase {
  id: string;
  version: string;
  type: string;
}

export class PatientCheckup {
  id: string;
  version: string;
  type: string;
  bloodPressure: string;
  cholestrol: string;
  glucose: string;
  height: number;
  weight: number;
  doctor: number;
}