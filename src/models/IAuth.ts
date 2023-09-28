import {ISpecialist} from "./ISpecialist";
import {IUser} from "./IUser";

export interface IAuthResponse {
  token: string,
  type: "user" | "specialist",
  specialist: ISpecialist,
  user: IUser,
}

export interface IAuthRegister {
  name: string,
  email: string,
  password: string,
  type: string,
  organizationId?: string,
}

export interface IAuthLogin {
  email: string,
  password: string,
  type: string,
}
