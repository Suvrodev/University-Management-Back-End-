import { TStudent, TStudentModel } from "./student.interface";
import { StudentModel } from "./student.model";

///ctrate Student
const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(studentData);

  const student = new StudentModel(studentData);

  if (await student.isStudentExists(studentData.id)) {
    throw new Error("Student Already Exists");
  }

  const result = await student.save();
  return result;
};

//get All students
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

//get All students
const getSingleStudentsFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
};
