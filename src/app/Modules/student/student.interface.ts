import { Model, Types } from "mongoose";

export type TGaurdian = {
  fatherName: string;
  fatherOccupcation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TStudentName;
  gender: "Male" | "Female" | "Other";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGaurdian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isDeleted: boolean;
};

//For Static
//Custom Instance Method
export type TStudentMethods = {
  isStudentExists(id: string): Promise<TStudent | null>;
};

export type TStudentModel = Model<
  TStudent,
  Record<string, never>,
  TStudentMethods
>;
