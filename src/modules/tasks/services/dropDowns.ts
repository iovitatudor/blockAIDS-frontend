import {ISelectOptions} from "../../../ui/MySelect/MySelect";
import {ITaskType} from "../../../models/ITaskType";
import {IOrganizations} from "../../../models/IOrganizations";
import {ISpecialist} from "../../../models/ISpecialist";
import {IUser} from "../../../models/IUser";

export const buildTaskTypes = (taskTypes: ITaskType[]) => {
  return taskTypes.map(taskType => ({
    name: taskType.name,
    value: taskType.id.toString()
  } as ISelectOptions))
}

export const buildOrganizations = (organizations: IOrganizations[]) => {
  return organizations.map(organization => ({
    name: organization.name,
    value: organization.id.toString()
  } as ISelectOptions))
}

export const buildSpecialists= (specialists: ISpecialist[]) => {
  return specialists.map(specialist => ({
    name: `${specialist.name}`,
    value: specialist.id.toString(),
    icon: `${process.env.REACT_APP_BACKEND_URL}/${specialist.avatar}`,
  } as ISelectOptions))
}

export const buildUsers = (users: IUser[]) => {
  return users.map(user => ({
    name: `${user.name}`,
    value: user.id.toString(),
    icon: `${process.env.REACT_APP_BACKEND_URL}/${user.avatar}`,
  } as ISelectOptions))
}