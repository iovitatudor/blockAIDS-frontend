import {IOrganizations} from "./IOrganizations";

export interface ISpecialist {
  "id": number,
  "name": string,
  "email": string,
  "jobPosition": string,
  "avatar": string,
  "organization": IOrganizations[] | null,
}