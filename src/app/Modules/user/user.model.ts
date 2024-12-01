import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, "id must be requires"],
    },
    password: {
      type: String,
      maxlength: 20,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//Document pre middleware
userSchema.pre("save", async function (next) {
  //Hashing password and save into db
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycript_salt_round)
  );
  next();
});

//Document post middleware
//set " " expmty string after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const UserModel = model<TUser>("users", userSchema);
