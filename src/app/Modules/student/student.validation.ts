import { z } from "zod";

const studentNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(10)
    .refine((value) => {
      const firstNameStr =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return value === firstNameStr;
    }),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1).max(10),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1),
  fatherOccupcation: z.string().trim().min(1),
  fatherContactNo: z.string().trim().min(1),
  motherName: z.string().trim().min(1),
  motherOccupation: z.string().trim().min(1),
  motherContactNo: z.string().trim().min(1),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1),
  occupation: z.string().trim().min(1),
  contactNo: z.string().trim().min(1),
  address: z.string().trim().min(1),
});

const studentValidationSchema = z.object({
  id: z.string().trim().min(1),
  // password: z.string().max(20).optional(),
  name: studentNameValidationSchema,
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string().trim().min(1),
  email: z.string().trim().email(),
  contactNo: z.string().trim().min(1),
  emergencyContactNo: z.string().trim().min(1),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-"]),
  presentAddress: z.string().trim().min(1),
  permanentAddress: z.string().trim().min(1),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean().default(false),
});

export default studentValidationSchema;
