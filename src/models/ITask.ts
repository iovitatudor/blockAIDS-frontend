import {IUser} from "./IUser";
import {ISpecialist} from "./ISpecialist";
import {ITaskType} from "./ITaskType";
import {IOrganizations} from "./IOrganizations";
import {TaskStatusesEnum} from "../modules/tasks/enums/TaskStatusesEnum";

export interface ITask {
  id?: number,
  name: string,
  dateDue: string,
  status: TaskStatusesEnum,
  points: number,
  description: string,
  user: IUser,
  specialist: ISpecialist,
  taskType: ITaskType,
  organization: IOrganizations,
}