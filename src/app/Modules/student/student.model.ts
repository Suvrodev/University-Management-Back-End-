import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import {
  TGaurdian,
  TLocalGuardian,
  TStudent,
  TStudentMethods,
  TStudentModel,
  TStudentName,
} from "./student.interface";
import config from "../../config";

const studentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First Name is required."],
    maxlength: [10, "First name can not be more than 10 "],
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return value === firstNameStr;
      },
      message: "{VALUE} is not capitalize formate",
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required."],
    maxlength: [10, "Last name can not be more than 10 "],
    trim: true,
  },
});

const guardianSchema = new Schema<TGaurdian>({
  fatherName: {
    type: String,
    required: [true, "Father's Name is required."],
    trim: true,
  },
  fatherOccupcation: {
    type: String,
    required: [true, "Father's Occupation is required."],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's Contact Number is required."],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother's Name is required."],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's Occupation is required."],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's Contact Number is required."],
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local Guardian's Name is required."],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, "Local Guardian's Occupation is required."],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Local Guardian's Contact Number is required."],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Local Guardian's Address is required."],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, TStudentModel, TStudentMethods>(
  {
    id: {
      type: String,
      unique: true,
      required: [true, "Id must be required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password must be required"],
      maxlength: [20, "Password can not be more than 20 character"],
    },
    name: {
      type: studentNameSchema,
      required: [true, "Name must be required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message:
          "{VALUE} is not a valid gender. Choose either 'Male' or 'Female'.",
      },
      required: [true, "Gender is required."],
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of Birth is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, "Contact Number is required."],
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency Contact Number is required."],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "O+", "O-"],
        message:
          "{VALUE} is not a valid blood group. Choose from 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'.",
      },
      required: [true, "Blood Group is required."],
    },
    presentAddress: {
      type: String,
      required: [true, "Present Address is required."],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent Address is required."],
      trim: true,
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian Must be required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local Guardian must be required"],
    },
    profileImage: {
      type: String,
    },
    isActive: {
      type: String,
      enum: {
        values: ["active", "blocked"],
        message:
          "{VALUE} is not valid. Status must be either 'active' or 'blocked'.",
      },
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

///Virtual
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//Middleware
//Document pre middleware
studentSchema.pre("save", async function (next) {
  //Hashing password and save into db
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycript_salt_round)
  );
  next();
});

//Document post middleware
studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

//Query Middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//For Custom instance model
studentSchema.methods.isStudentExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};
export const StudentModel = model<TStudent, TStudentModel>(
  "Students",
  studentSchema
);
// export const studentModel = model<TStudent>("Students", studentSchema);
