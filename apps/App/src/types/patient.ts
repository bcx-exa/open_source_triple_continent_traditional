export class PatientInfo {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  bloodType: string;
  gender: string;
  age: number;
  race: string;
}

export class PatientBase {
  id: string;
  type: string;
}

export class PatientCheckup {
  id: string;
  type: string;
  bloodPressure: string;
  cholestrol: string;
  glucose: string;
  height: number;
  weight: number;
  doctor: number;
}