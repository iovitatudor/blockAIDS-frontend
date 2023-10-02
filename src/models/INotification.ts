import {ITask} from "./ITask";
import {IUser} from "./IUser";
import {ISpecialist} from "./ISpecialist";

export interface INotification {
  id: number,
  userStatus: string,
  specialistStatus: string,
  userMessage: string,
  specialistMessage: string,
  task: ITask,
  user: IUser,
  specialist: ISpecialist,
  created: string,
}