import {IUser} from "./IUser";
import {ISpecialist} from "./ISpecialist";
import {ITaskType} from "./ITaskType";
import {IOrganizations} from "./IOrganizations";
import {INotification} from "./INotification";

export interface ITask {
  id?: number,
  name: string,
  dateDue: string,
  status: string,
  points: number,
  description: string,
  user: IUser,
  specialist: ISpecialist,
  taskType: ITaskType,
  notification: INotification,
  organization: IOrganizations,
}